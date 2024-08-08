---
title: Entra ID Emergency Access Account
description: A guide on configuring an Entra ID Emergency Access (Break Glass) Account with Phishing-resistant Authentication
tags:
  - IAM
  - Azure
  - EntraID
keywords:
  - IAM
  - Azure
  - Entra ID
last_update:
  date: 8/4/2024
  author: Mecken Swyter
---
import Image from '@theme/IdealImage';

# Entra ID Emergency Access (Break Glass) Account with Phishing-resistant Authentication  
  
<Image style={{ marginBottom: '1rem' }} img={require('../assets/entra-emergency-access-account/break-glass-hero-800.png')} />

To avoid losing administrative access to the Entra portal from things such as misconfiguring a conditional access policy (CAP), it's important to setup an emergency access (break glass) account with the Global Administrator role assigned to it. In this guide, we'll walkthrough the process of creating an emergency access account, setting up phishing resistant authentication, and setup monitoring to receive alerts when the account is used.  

:::note 
To follow along with this guide, you will need a FIDO2 security key with capacitive touch to implement phishing resistant authentication.
:::

:::info
## Emergency access account common best practices  
Some of the common best practices when managing an emergency access account are as follows:  
- Avoid using the account for normal administrative tasks or associating it with an individual user. Nor should any of the account's authentication methods be tied to an individual user.  
- Exclude the account from all Conditional Access policies.  
- Avoid using an account that is synced from an on-premises Active directory instance. Create a cloud-only account using the *.onmicrosoft.com domain associated with the Entra ID tenant.  
- If using Privileged Identity Management (PIM), make sure the Global Administrator role is a permanent assignment and if using a password, make sure it is not set to expire.  
- Monitor sign-in and audit logs of this account.
:::

## Create a user with the Global Administrator role
:::tip
Be sure to use **.onmicrosoft.com* for the **User principal name** and use a strong randomly generated password. Also, if using Privileged Identity Management (PIM), verify the Global Administrator role is a permanent assignment for this user.
:::
1. Navigate to entra.microsoft.com
2. **Select Users** > **All users** > **New user** > **Create new user**
3. Fill out all the required fields under the **Basics** tab and verify the **Account enabled** box is checked.
5. Under the **Properties** tab fill out any applicable fields.
6. Under the **Assignments** tab select Add role. Search for and select the **Global Administrator** role.
7. Select the **Review + create** tab, then select the **Create** button.


## Setup phishing-resistant authentication
In the past, it has been recommended by administrators to avoid using Multi-factor authentication (MFA) with the break glass account and to use only a very strong password; however, Microsoft is now requiring MFA to access the Azure portal (this inludes the Entra admin portal). To satisfy this requirement and avoid tying MFA to an individual user, we'll setup a FIDO2 security key as a means of strong authentication for the break glass account.

:::tip
Verify that Passkey (FIDO2) is enabled as an authentication method. This can be verified from the Entra admin center by navigating to **Protection** > **Authentication methods** > **Polices** > **Passkey (FIDO2)** and verifying the method is enabled for All users or Selected groups.
:::

:::warning
It is recommended to setup two separate passkeys in the event that one of them becomes inaccessible. Repeat the steps below to setup a second YubiKey. 
:::

1. Open a new InPrivate or Incognito browser window and navigate to https://aka.ms/mfasetup
2. Sign in with the newly created break glass account. It's possible you will be prompted to setup MFA. If so, setup MFA with either the **Microsoft Authenticator app** or **phone**. Once the passkey (YubiKey) has been configured with this account, the Microsoft Authenticator or phone option can be removed as a sign-in method, as the YubiKey and PIN satisfy the strong authentication requirement.
3. From the **Security** tab, select **Add a sign-in method**. Under choose a method, select **Security key**.
4. Follow the on-screen instructions to finish setting up the YubiKey. If a PIN has not already been setup for the YubiKey, you will be prompted to setup a PIN and prompted to touch the YubiKey to finalize the setup.
5. Now store the YubiKey and PIN in a safe place.
<Image className='step-image' img={require('../assets/entra-emergency-access-account/passkey-setup.gif')} />

## Setup monitoring and alerting for sign-in logs  
:::note
An Azure subscription is required to complete this section of the guide; as well as at least a Microsoft Entra ID P1 or P2 tenant. 
:::

Since the emergency access account is a highly privileged role, it's important to configure monitoring and alerting of all sign-in events generated by this account. We'll walkthrough setting this this up using an Azure Log analytics Workspace.

### Create a Log Analytics Workspace  
1. Navigate to portal.azure.com  
2. In the top search bar of the Azure portal, search for and select **Log Analytics workspaces**.  
3. Select **+ Create**, fill out all of the necessary fields (if an appropriate resource group has not already been created,  a new one can be created in this step) and select **Review + Create**.

### Configure Entra ID Diagnostic Settings  
:::tip
Allow up to 15 minutes after configuring the Diagnostic Settings for the Log Analytics workspace to start collecting sign-in logs. 
:::

1. Navigate to entra.microsoft.com  
2. From the Microsoft Entra admin center, navigate to **Identity** > **Monitoring & Health** > **Diagnostic settings.**  
3. Under **General**, select **+ Add diagnostic setting.**
4. Create a **Diagnostic setting name.**  
    1. Under **Logs** > **Categories**, select the checkbox for **AuditLogs.**  
    2. Under **Destination details**, select the checkbox for **Send to Log Analytics workspace.**  
    3. Select the appropriate Azure subscription and the Log Analytics workspace created in the previous steps and select **Save**.

After 15 minutes, use the Break Glass account (or any other account in the tenant) and sign in to a Microsoft service to generate some sign-in events. Then from the Entra admin center, navigate to **Identity** > **Monitoring & Health** > **Log Analytics** to confirm sign-in logs have been generated.

:::tip
If no sign-in events are being displayed, try adjusting the **Time range** filter. Additionally, try switching from **Simple mode** to **KQL mode** and run the following query:
```sql title="KQL"
search *
```
:::

### Create an alert to notify Administrators when the Break Glass account is used to sign-in  
:::note
To obtain the Object ID to use in the KQL query used for the alert, from the Entra admin center, navigate to **Identity** > **Users** > **All users**, and select the Emergency Access (Break glass) user and copy the Object ID of the user for use in the KQL query.
::: 

1. Navigate to *portal.azure.com*  
2. In the top search bar of the Azure portal, search for and select **Log Analytics workspaces**.
3. Select the Log Analytics workspace associated with the Entra ID Diagnostic Settings sign-in logs.
4. Navigate to **Monitoring** > **Alerts**.
5. Select **+ Create** > **Alert rule**.
6. Under **Condition** > **Signal name**, select **Custom log search**.
7. Insert the following KQL into the query editor (makes sure to replace the Object ID with the actual Object ID of the Break glass account):
  ```sql title="KQL"
  // Search for a single Object ID (UserID)
  SigninLogs
  | project UserId 
  | where UserId == "00aa00aa-bb11-cc22-dd33-44ee44ee44ee"
  ```
  If monitoring multiple Break glass accounts, use a query similar to the one below.

  ```sql title="KQL"
  // Search for a single Object ID (UserID)
  SigninLogs
  | project UserId 
  | where UserId == "00aa00aa-bb11-cc22-dd33-44ee44ee44ee" or UserId == "11bb11bb-cc22-dd33-ee44-55ff55ff55ff"
  ```
8. Select the **Run** button and then the **Continue Editing Alert** button.  
9. Under the Condition tab, update the **Alert logic** > **Threshold value** to **0**.
:::note
If increasing the **Frequency of evaluation** to reduce the monthly cost of the alert,  the frequency should be less than or equal to the alert evaluation period. Since the **Evaluation period** is based on aggregated points, update the **Aggregation granularity** to be greater than or equal to **Frequency of evaluation**. 
::: 
10. Under the **Actions** tab, select **Use action groups**. If there is already an appropriate action group available, select the checkbox next to the action group and the **Select** button. If a new action group is needed, select **+ Create action group**, fill out the appropriate information under the **Basics** and **Notifications** tabs (Select **Email/SMS message/Push/Voice** for **Notification type**).  
11. Under the **Details** tab, update the **Alert rules details** > **Severity** field to **0 - Critical**.  
12. Select **Review + create** > **Create**. 

To verify everything is working as expected, sign in to entra.microsoft.com using the Emergency access (Break glass) account to generate some sign-in logs to activate the alert. If everything is working as expected, alerts should start being received via the notification methods defined in the action group associated with the alert. Additionally, navigating to **Monitoring** > **Alerts** from the Log Analytics workspace should display a list of recently fired alerts.
<Image className='step-image' img={require('../assets/entra-emergency-access-account/break-glass-alerts.png')} />

If alerts are being received, everything has been configured correctly. 
