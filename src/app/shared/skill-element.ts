export interface SkillElement {
    name: string,
    element: string, // Wind, Fire, etc.
    descrAttack: string,
    descrPassive: string,
    skillBonus?: {
        scaling?: number,
        type?: number, // 0 = flat damage increase, 1 = additional basic attack, 2 = increase for each target, 4 = ignite
        extra?: string, // stuff that is damage but can't be included in calculations. e.g. frost (40% max HP)
    },
    passiveBonus?: {
        scaling?: number,
        type?: number, // 0 = flat damage,  3 = splash dmg, 5 = lightning totem
        extra?: string,
    }
    requirement?: {
        skill: string, // attack/passive
        type: number, // 0 = speed requirement
    }
}