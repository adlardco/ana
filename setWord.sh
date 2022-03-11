#!/bin/bash
APP_FILE=app.js
WORDS=words.txt
NUM_WORDS=$(wc -l ${WORDS} | cut -d" " -f1)
WORD_INDEX=$(expr ${RANDOM} % ${NUM_WORDS})
WORD=$(head -${WORD_INDEX} ${WORDS} | tail -1)
WORD=$(echo ${WORD} | sed "s/[^a-zA-Z]//g" | sed -e 's/\(.*\)/\L\1/')
SCRAMBLED=$(echo ${WORD} | fold -w1 | shuf | tr -d '\n')
sed -i "s/this.word[ ]*=[ ]*\x27[a-zA-Z]*\x27/this.word = '${WORD}'/" ${APP_FILE}
sed -i "s/[ ]+guess[ ]*=[ ]*\x27[a-zA-Z]*\x27/ guess = '${SCRAMBLED}'/" ${APP_FILE}
