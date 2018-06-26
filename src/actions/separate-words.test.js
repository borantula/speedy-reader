import separateWords from './separate-words'


const texts = {
    //6 words
    textShort : 'lorem ipsum dolor sit amet foo',
    //17 words
    textLong : 'lorem ipsum dolor sit amet foo bar, test "we are the champions my friend" and some other.',

    //16 words
    paragraph : "Common sense tells us that happy, collaborative teams are productive teams.\n" +
        "\n" +
        "Research backs it up, too.\n"
};

test('testing 2 words group',()=>{
    expect(separateWords(texts.textShort,2).length).toBe(Math.ceil(6/2));

    expect(separateWords(texts.textLong,2).length).toBe(Math.ceil(17/2));
});

test('testing 3 words group',()=>{
    expect(separateWords(texts.textShort,3).length).toBe(Math.ceil(6/3));

    expect(separateWords(texts.textLong,3).length).toBe(Math.ceil(17/3));
});

test('testing 5 words group',()=>{
    expect(separateWords(texts.textShort,5).length).toBe(Math.ceil(6/5));

    expect(separateWords(texts.textLong,5).length).toBe(Math.ceil(17/5));
});

test('testing full size',()=>{
    expect(separateWords(texts.textShort,6).length).toBe(1);
    expect(separateWords(texts.textLong,17).length).toBe(1);


    const short = separateWords(texts.textShort,10);

    expect(short[0] === texts.textShort);

});

test('testing over size',()=>{
    expect(separateWords(texts.textShort,10).length).toBe(1);
    expect(separateWords(texts.textLong,44).length).toBe(1);


    const short10 = separateWords(texts.textShort,10);

    expect(short10[0] === texts.textShort);

});

test('testing left empty second',()=>{
    expect(separateWords(texts.textShort).length).toBe(6);
    expect(separateWords(texts.textLong).length).toBe(17);

});

test('testing empty text',()=>{
    expect(separateWords("").length).toBe(0);

});

test('testing number',()=>{
    expect(separateWords(2).length).toBe(1);
    expect(separateWords(2)[0]).toBe("2");
});

test('testing paragraph',()=>{
    expect(separateWords(texts.paragraph).length).toBe(16);
    expect(separateWords(texts.paragraph,2).length).toBe(8);
    expect(separateWords(texts.paragraph,3).length).toBe(Math.ceil(16/3));
    expect(separateWords(texts.paragraph,5).length).toBe(Math.ceil(16/5));
});

