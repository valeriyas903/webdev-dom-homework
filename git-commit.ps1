$ErrorActionPreference = 'Stop'
$wsPath = Join-Path $PSScriptRoot '.'
Set-Location $wsPath
if (-not (Test-Path '.git')) {
    git init
}
git add index.html modules/loginComponent.js
git commit -m "Fix: Resolve merge conflict in index.html and verify to-register element in login template"
Write-Host "Commit completed successfully"

