---
title: Entra ID Emergency Access Account
description: A guide on configuring an Entra ID Emergency Access (Break Glass) Account with Phishing-resistant Authentication
tags:
  - IAM
  - Azure
  - Entra ID
keywords:
  - IAM
  - Azure
  - Entra ID
last_update:
  date: 7/29/2024
  author: Mecken Swyter
---
import Image from '@theme/IdealImage';

# Entra ID Emergency Access (Break Glass) Account with Phishing-resistant Authentication  
  
<Image style={{ marginBottom: '1rem' }} img={require('../assets/entra-emergency-access-account/break-glass-account.png')} />

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


## Setup Phishing-resistant authentication
In the past, it has been recommended by administrators to avoid using Muti-factor authentication (MFA) with the break glass account and to use only a very strong password; however, Microsoft is now requiring MFA to access the Azure portal (this inludes the Entra admin portal). To satisfy this requirement and avoid tying MFA to an individual user, we'll setup a FIDO2 security key as a means of strong authentication for the break glass account.

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
<!-- <Image className='small-image' img={require('../assets/entra-emergency-access-account/yubikey-setup.png')} /> -->
<Image style={{ marginBottom: '1rem' }} img={require('../assets/entra-emergency-access-account/passkey-setup.gif')} />

