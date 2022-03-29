export interface Skill {
    level: number,
    damage: number,
    type: string, // current types possible: damage/heal/shield
    scalingSource: string // e.g. ATK/HP/whatever will be added in the future
}