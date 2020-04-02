#!/bin/bash

#终止一个错误
set -e

#进入生成的构建文件夹
cd docs

git init
git add -A
git commit -m 'deploy'

git push -f https://git.inner.ink/pqs/fish-api.git master
