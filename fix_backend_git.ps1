Set-Location "$PSScriptRoot"

if (Test-Path "backend\.git") {
    Remove-Item -Path "backend\.git" -Recurse -Force
}

git rm -r --cached backend
git add .
git commit -m "Fix: Reparando submodulo de backend"
git push origin main

Write-Host "LISTO. Ahora ve al servidor y haz git pull"
