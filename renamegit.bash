ls ./src/*.js |
    while read line; do git mv -- $line ${line%.js}.ts; done;


find ./src/components -type f -name "*.ts" |
    xargs grep 'import React[ ,]' |
    cut -d: -f1 |
    uniq |
    while read line; do git mv -- $line ${line%.ts}.tsx; done;