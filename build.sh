#!/bin/bash
INDEX=index.html
WORDS=words.txt
NUM_WORDS=$(wc -l ${WORDS} | cut -d" " -f1)
WORD_INDEX=$(expr ${RANDOM} % ${NUM_WORDS})
WORD=$(head -${WORD_INDEX} ${WORDS} | tail -1)
WORD=$(echo ${WORD} | sed "s/[^a-zA-Z]//g" | sed -e 's/\(.*\)/\L\1/')
SCRAMBLED=$(echo ${WORD} | fold -w1 | shuf | tr -d '\n')
sed -i "s/abcdefg/${WORD}/g" ${INDEX}
sed -i "s/gfedcba/${SCRAMBLED}/g" ${INDEX}
rm -rf .git
git init && git add . && git checkout -B main && git commit -m 'init'
git remote add origin https://github.com/adlardco/ana.git
git push --force --set-upstream origin main