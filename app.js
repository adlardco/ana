'use strict';

class App {

  constructor(doc) {
    this.letter = index => doc.getElementById('' + index);
    this.word = 'mostly';
    const guess = 'mtsloy';
    this.selectedIndex = -1;

    for (let index = 0; index < guess.length; index++) {
      const letter = doc.createElement('span');
      doc.body.appendChild(letter);
      letter.id = '' + index;
      letter.onclick = () => this.onClickLetter(index);
      letter.innerHTML = guess[index];
      this.setLetterStyle(letter, false);
    }
  }

  onClickLetter(index) {
    if (!this.isSolved()) {
      this.selectIndex(index);
    }
    if(this.isSolved()) {
       this.setAllLettersBold();
    }    
  }

  setAllLettersBold() {
    for (let index = 0; index < this.word.length; index++) {
        this.setLetterStyle(this.letter(index), true);
    }    
  }

  isSolved() {
    for (let index = 0; index < this.word.length; index++) {
      if(this.letter(index).innerHTML != this.word.charAt(index)) {
        return false;
      }
    }
    return true;
  }

  selectIndex(index) {
    const selectedLetter = this.letter(this.selectedIndex);
    const letter = this.letter(index);     
    if (selectedLetter && letter) {
      this.swapLetters(letter, selectedLetter);
      index = -1;
    }
    const letterNode = selectedLetter || letter;
    if (letterNode) {
      const bold = index >= 0;
      this.setLetterStyle(letterNode, bold);
    }  
    this.selectedIndex = index;
  } 

  swapLetters(letter, otherLetter) {
    const letterText = otherLetter.innerHTML;
    otherLetter.innerHTML = letter.innerHTML;
    letter.innerHTML = letterText;
  }

  setLetterStyle(letter, bold) {
    const wordWidth = 80;
    const size = wordWidth / this.word.length;
    const marginSize = 0.05 * size;
    const borderRadius = 0.2 * size;
    const fontSize = 0.7 * size;
    const fontWeight = bold ? 'bold' : 'normal';
    const backgroundColor = bold ?  '#888888' : '#00aa00';
    letter.style = `
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: ${size}vw;
      width: ${size}vw;
      margin: ${marginSize}vw;
      border-radius: ${borderRadius}vw;
      font-size: ${fontSize}vw;
      font-weight: ${fontWeight};
      background-color: ${backgroundColor};
         `;
   }
}

