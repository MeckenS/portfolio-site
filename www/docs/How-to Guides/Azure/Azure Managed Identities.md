---
tags:
  - Azure
  - Entra ID
---
import Image from '@theme/IdealImage';

# Azure Managed Identities

Managed identities can be used to manage Azure resources without using hardcoded credentials - removing the need to enter credentials from a VM (or other resources such as Azure Functions) that are accessing resources the managed identity has been given access to.  There are two types of managed identities - **User Assigned** and **System Assigned**. User assigned can be used by multiple resources and system assigned is tied to one specific VM (resource). User assigned is created as a **Managed Identity** that can be assigned to multiple VMs. 

## Creating a System Assigned managed identity

1. Navigate to **Home > Virtual Machines > VM > Identity.**
2. Under the **System assigned** tab, toggle **Status** to **On**.

    <Image img={require('./system-assigned-indentity.png')} />
    
3. Navigate to **Home** > **Resource Groups** > **[ Resource group ]** > **Access control (IAM)**    
4. **+ Add** > **Add role assignment**
5. Select a Role, select members (managed identity), **Review + assign**.
6. Use RDP (Remote Desktop) to connect to the VM. 
7. Open PowerShell (Admin) and type the following command to automatically connect (without manually entering credentials) to the Azure resources the VM has access to via System managed identity with the following command: `az login --identity`   
8. Type `az group list` to verify access to the resource group.
    
## Creating a User Assigned managed identity

1. Navigate to **Home > Managed Identities**.
2. Select **+ Create**, fill out the necessary information.
    
    
    
3. Select **Review + Create > Create**.
4. Repeat the following steps for each VM that will be configured with User assigned managed identity.
    1. Navigate to **Home > Virtual Machines > VM > Identity.**
    2. Under the **User assigned** tab, **select + Add**. Select the previously created managed identity.
        
        
        
    3. Select **Add.**
5. Navigate to **Home** > **Resource Groups** > **[ Resource group ]** > **Access control (IAM).**
6. **+ Add** > **Add role assignment.**
7. Select a Role, select members (managed identity), **Review + assign**.
8. Use RDP (Remote Desktop) to connect to the VM.
9. Open PowerShell (Admin) and type the following command to automatically connect (without manually entering credentials) to the Azure resources the VM has access to via System managed identity with the following command: `az login --identity`.
