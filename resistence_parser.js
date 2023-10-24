import {readFile, writeFile} from 'fs/promises';

const monsterFile = await readMonsters();
const monsterData = await createMonsterFile(monsterFile);
writeToFile(monsterData);

// from ambios' guide who got them from Jimeous+
// https://gamefaqs.gamespot.com/gbc/562719-dragon-warrior-monsters-2-taras-adventure/faqs/19460

// =============================================================================
// MONSTER RESISTANCES ---------------------------------------------------------
// =============================================================================
// Monster Resistances are a lot easier to understand. They range from 0 to 3,
// 0 being the WEAKEST resistance to that group of spells, 3 being the STRONGEST
// resistance to that group of spells. The groups are as follows:

//  A: Blaze, Blazemore, Blazemost, BigBang, FireSlash
//  B: Firebal, Firebane, Firebolt
//  C: Bang, Boom, Explodet
//  D: WindBeast, Vacuum, Infernos, Infermore, Infermost, MultiCut, VacuSlash
//  E: Lightning, Bolt, Zap, Thordain, Hellblast, BoltSlash
//  F: IceBolt, SnowStorm, Blizzard, IceSlash
//  G: Radiant, Surround, SandStorm
//  H: Sleep, NapAttack, SleepAir, SleepAll
//  I: EerieLite, UltraDown, Beat, K.O.Dance, Defeat
//  J: OddDance, RobDance, RobMagic
//  K: StopSpell
//  L: PaniDance, PanicAll
//  M: Sap, Defense, SickLick
//  N: Slow, SlowAll
//  O: Sacrifice, Kamikaze, Ramming
//  P: MegaMagic
//  Q: FireAir, BlazeAir, Scorching, WhiteFire
//  R: FrigidAir, IceAir, IceStorm, WhiteAir
//  S: PoisonHit, PoisonGas, PoisonAir
//  T: Paralyze, PalsyAir
//  U: Curse
//  V: LegSweep, LushLicks, Ahhh, BigTrip, WarCry, LureDance
//  W: DanceShut
//  X: MouthShut
//  Y: RockThrow, CallHelp, YellHelp
//  Z: GigaSlash
//  Æ: Geyser, Watershot, Tidalwave

async function createMonsterFile(monsterFile) {
    // DracoLord  1 1 0 0 0 1 3 3 3 2 3 3 3 3 3 0 1 1 3 2 3 3 3 3 0 0 0
    return monsterFile.toString().split('\n').map( (monster) => {
        const params = monster.split(/\W+/);
        return {
            name: params[0],
            blaze: params[1],
            firebal: params[2],
            bang: params[3],
            wind: params[4],
            lightening: params[5],
            icebolt: params[6],
            blind: params[7],
            sleep: params[8],
            downer: params[9],
            oddDance: params[10],
            stopSpell: params[11],
            confuse: params[12],
            sap: params[13],
            slow: params[14],
            kamikaze: params[15],
            megaMagic: params[16],
            fireAir: params[17],
            frigidAir: params[18],
            poison: params[19],
            paralyze: params[20],
            curse: params[21],
            skipTurn: params[22],
            danceShut: params[23],
            mouthShut: params[24],
            callHelp: params[25],
            gigaSlash: params[26],
            water: params[27],
        };
    });
}

async function readMonsters() {
    try {
        const monsters = await readFile('resistences.txt', 'utf-8');
        return monsters;
    } catch (error) {
        console.log(error);
    }
}

async function writeToFile(data) {
    try {
        await writeFile('resistences_json.txt', JSON.stringify(data));
        console.log("file written successfully!");
    } catch (error) {
        console.log(error);
    }
}