import * as cheerio from 'cheerio';
import axios from 'axios';
import {writeFile} from 'fs/promises';

const breedingJSON = await getBreedingList();
writeToFile(breedingJSON);

async function getBreedingList() {
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
    //const mons = lines.filter( line => { return /\|  [A-Z]{2,}/.test(line); });
    const breedingJSON = {};
    for(let i = 0; i < lines.length; i++) {
        // monster entry found
        if(/\|  [A-Z]{2,}/.test(lines[i])) {
            // grab monster name
            const monster = lines[i].match(/\|  (\w*)/)[1];
            breedingJSON[monster] = [];
            //console.log(monster);
            // move down 5 lines and check if extra found row added
            i+=5;
            // if line has the word base move down 2 lines
            if(lines[i].match(/Base/)) { i += 2; }
            // start looping breeding rows keeping in mind that some last multiple lines
            for(let breedingTableCount = 0; /[A-Z]+/.test(lines[i]); breedingTableCount++) {
                // sometimes he adds a base mate row in the middle of a monster entry

                console.log(/[A-Z]+/.test(lines[i]));;
                console.log("I'm here");
                if(lines[i].match(/Base/)) { i += 2;}
                // initialize empty table array
                breedingJSON[monster][breedingTableCount] = {};
                breedingJSON[monster][breedingTableCount]["baseParents"] = [];
                breedingJSON[monster][breedingTableCount]["mateParents"] = [];
                // go down lines until we hit --- which mark the end of the table
                while(!/---/.test(lines[i])) {
                    console.log(lines[i]);
                    
                    let [_, baseMonsters, mateMonsters] = lines[i].split("¦");
                    console.log(`baseMonsters is: ${baseMonsters}`);
                    console.log(`mateMonsters is: ${mateMonsters}`);
                    breedingJSON[monster][breedingTableCount].baseParents = breedingJSON[monster][breedingTableCount].baseParents.concat(baseMonsters.trim().split(" "));
                    breedingJSON[monster][breedingTableCount].mateParents = breedingJSON[monster][breedingTableCount].mateParents.concat(mateMonsters.trim().split(" "));
                    console.log(`btc is ${JSON.stringify(breedingJSON[monster][breedingTableCount].mateParents)}`);
                    console.log(`mate parents is ${JSON.stringify(breedingJSON[monster][breedingTableCount].mateParents.concat(mateMonsters.trim().split(" ")))}`);
                    i++;
                }
                i++;
            }
        }
    }
    return breedingJSON;
}
async function writeToFile(json) {
    try {
        await writeFile('breeding_data.txt', JSON.stringify(json));
        console.log("file written successfully!");
    } catch (error) {
        console.log(error);
    }
}