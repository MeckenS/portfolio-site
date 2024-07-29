---
title: Entra ID Emergency Access Account
description: A guide on configuring an Entra ID Emergency Access (Break Glass) Account with Phishing Resistant Authentication 
tags:
  - IAM
  - Azure
  - Entra ID
keywords:
  - IAM
  - Azure
  - Entra ID
last_update:
  date: 7/28/2024
  author: Mecken Swyter
---
import Image from '@theme/IdealImage';

# Entra ID Emergency Access (Break Glass) Account with Phishing Resistant Authentication  
  
<Image img={require('../assets/entra-emergency-access-account/break-glass-account.png')} />  

To avoid losing administrative access to the Entra portal from things such as misconfiguring a conditional access policy (CAP), it's important to setup an emergency access (break glass) account with the Global Administrator role assigned to it. In this guide, we'll walkthrough the process of creating an emergency access account, setting up phishing resistant authentication, and setup monitoring to receive alerts when the account is used.  

:::note 
To follow along with this guide, you will need a FIDO 2 security key to implement phishing resistant authentication.
:::
  
## Emergency access account common best practices  
Some of the common best practices when managing an emergency access account are as follows:  
- Avoid using the account for normal administrative tasks or associating it with an individual user. Nor should any of the account's authentication methods be tied to an individual user.  
- Exclude the account from all Conditional Access policies.  
- Avoid using an account that is synced from an on-premises Active directory instance. Create a cloud-only account using the *.onmicrosoft.com domain associated with the Entra ID tenant.  
- If using Privileged Identity Management (PIM), make sure the Global Administrator role is a permanent assignment and if using a password, make sure it is not set to expire.  
- Monitor sign-in and audit logs of this account.