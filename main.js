import * as cheerio from 'cheerio';
import axios from 'axios';
import {writeFile} from 'fs/promises';

const words = await getWikiList();
writeToFile(words);

async function getWikiList() {
    const res = await axios.get(`https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Greek_wordlist`);
    const $ = cheerio.load(res.data);
    // first 20 li(s) are garbage
    const strs = $('li').text().split(" ").slice(500, 750);
    const defs = strs.map( str => {
        return str.replace(/[0-9]/g, '');
    });

    console.log(defs);
    return defs;
}

async function writeToFile(words) {
    try {
        await writeFile('list.txt', words.join('\n'));
        console.log("file written successfully!");
    } catch (error) {
        console.log(error);
    }
}