import * as cheerio from 'cheerio';
import axios from 'axios';
import {writeFile} from 'fs/promises';

const words = await getWikiList();
writeToFile(words);

async function getWikiList() {
    const res = await axios.get(`https://gamefaqs.gamespot.com/gbc/562719-dragon-warrior-monsters-2-taras-adventure/faqs/14383`);
    const $ = cheerio.load(res.data);
    // first 20 li(s) are garbage
    //const strs = $('li').text()//.split(" ").slice(500, 750);
    // const defs = strs.map( str => {
    //     return str.replace(/[0-9]/g, '');
    // });

    //console.log(strs);
    const lines = $.text().split('\n');
    const mons = lines.filter( line => { return /\|  [A-Z]{2,}/.test(line); });
    console.log(`lines:${lines.length}  mons${mons.length}`);
    return mons;
}
async function writeToFile(words) {
    try {
        await writeFile('breeding_data.txt', words.join('\n'));
        console.log("file written successfully!");
    } catch (error) {
        console.log(error);
    }
}