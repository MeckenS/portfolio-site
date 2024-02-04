---
last_update:
  author: Mecken Swyter
tags:
  - Windows Server
  - PowerShell
  - Active Directory
---
import Image from '@theme/IdealImage';

# Configure Active Directory using PowerShell

```powershell
New-Item -Path "c:\" -Name "PowerLab" -ItemType "directory"
'P@$$w0rd12' | ConvertTo-SecureString -Force -AsPlainText | Export-Clixml -Path C:\PowerLab\SafeModeAdministratorPassword.xml

$safeModePw = Import-Clixml -Path C:\PowerLab\SafeModeAdministratorPassword.xml

Install-windowsfeature -Name AD-Domain-Services

$forestParams = @{
    DomainName                    = 'techuplab.local'
    DomainMode                    = 'WinThreshold'
    ForestMode                    = 'WinThreshold'
    Confirm                       = $false
    SafeModeAdministratorPassword = $safeModePw
    WarningAction                 = 'Ignore'
}

$null = Install-ADDSForest @forestParams
```