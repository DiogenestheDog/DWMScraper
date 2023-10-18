import * as cheerio from 'cheerio';
import axios from 'axios';
import {writeFile} from 'fs/promises';

const words = await getWikiList();
writeToFile(words);

async function getWikiList() {
    const res = await axios.get(`https://gamefaqs.gamespot.com/gbc/562719-dragon-warrior-monsters-2-taras-adventure/faqs/14383`);
    const $ = cheerio.load(res.data);

    // ,———————————————————————————————————————————————————.
    // |  GREATDRAK       : FrigidAir IceSlash  SuckAll    |
    // ‘———————————————————————————————————————————————————’
    // ,---------------------------------------------------------------------.
    // ¦ Found: Limbo Key World  - Outside Door Shrine                       ¦
    // ¦----------------------------------+----------------------------------¦
    // ¦ Base                             ¦ Mate                             ¦
    // ¦----------------------------------+----------------------------------¦
    // ¦ DRAGONFM                         ¦ Battlerex Gigantes MetalKing     ¦
    // ¦                                  ¦ Unicorn Zapbird Centasaur        ¦
    // ¦                                  ¦ Kingslime Spotking               ¦
    // ¦                                  ¦ Whipbird                         ¦
    // ¦----------------------------------+----------------------------------¦
    // ¦ Base                             ¦ Mate                             ¦
    // ¦----------------------------------+----------------------------------¦
    // ¦ Dragon†5 or better               ¦ Dragon                           ¦
    // ¦----------------------------------+----------------------------------¦
    // ¦ DragonKid†5 or better            ¦ DragonKid                        ¦
    // ‘----------------------------------^----------------------------------’

    const lines = $.text().split('\n');
    const mons = lines.filter( line => { return /\|  [A-Z]{2,}/.test(line); });
    const breedingJSON = {};
    for(let i = 0; i < lines.length; i++) {
        // monster entry found
        if(/\|  [A-Z]{2,}/.test(lines[i])) {
            // grab monster name
            const monster = lines[i].match(/\|  (\w*)/)[1];
            // move down 5 lines and check if extra found row added
            i = i+5;
            console.log(monster);
            console.log(lines[i].match(/¦ [^¦]* ¦ (.+)/)[1]);
        }
    }
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