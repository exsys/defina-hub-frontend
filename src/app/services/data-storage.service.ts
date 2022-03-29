import { Injectable } from '@angular/core';

import { Hero } from '../shared/hero';
import { MainElement } from "../shared/main-element";
import { SkillElement } from '../shared/skill-element';
import { Composition } from '../shared/composition';
import { Skill } from '../shared/skill';
import { Damage } from '../shared/damage';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  element: string = ""; // element name for the current description
  requirement?: string; // requirement for elements
  description: string = "Hover over an element to see its description.";
  team: Hero[] = []; // currently selected heroes
  /* teamComp[0] = Hero 1, etc... 
  * initialize objects here already so there will be no undefined error.
  * also init has to be a variable or else you can't call some parameters dynamically */
  teamComp: Composition[] = [{ init: 1, elements: {} }, { init: 1, elements: {} }, { init: 1, elements: {} }, { init: 1, elements: {} }];
  // array for the damage output for each hero
  teamDamage: Damage[] = [
    {
      basicAtkDmg: { min: 0, max: 0, extra: "" },
      skillAtkDmg: { min: 0, max: 0, extra: "" },
      hyperAtkDmg: { min: 0, max: 0, extra: "" }
    },
    {
      basicAtkDmg: { min: 0, max: 0, extra: "" },
      skillAtkDmg: { min: 0, max: 0, extra: "" },
      hyperAtkDmg: { min: 0, max: 0, extra: "" }
    },
    {
      basicAtkDmg: { min: 0, max: 0, extra: "" },
      skillAtkDmg: { min: 0, max: 0, extra: "" },
      hyperAtkDmg: { min: 0, max: 0, extra: "" }
    },
    {
      basicAtkDmg: { min: 0, max: 0, extra: "" },
      skillAtkDmg: { min: 0, max: 0, extra: "" },
      hyperAtkDmg: { min: 0, max: 0, extra: "" }
    }
  ];

  ouroboros: number = 0;
  prometheus: number = 0;
  aegis: number = 0;
  thots: number = 0;
  wind: number = 0;
  fire: number = 0;
  water: number = 0;
  lightning: number = 0;
  earth: number = 0;
  natureBlessed: number = 0;

  timestamp?: number; // timestamp of last request. so request for nft card info can only be sent every 5 min.
  heroAmounts: number[] = [];
  rarityAmounts: number[] = [];

  constructor() { }

  // TODO: in skill element unter requirement requirementMet und text hinzufügen. und dann hier nur abfragen
  // ob requirementMet und wenn nicht dann this.requirement = text.
  // in parameters "element: any" because MainElement doesnt have requirement key. 
  changeDescription(element: any, description: string, index: number, skillType: string): void {
    this.element = element.name;

    this.checkRequirement(element, skillType, index);

    this.description = description;
  }

  changeTeam(hero: Hero, index: number): void {
    this.team[index] = hero;

    // iterate through selected heroes and check in which faction they are.
    let ouro = 0, promet = 0, aegis = 0, thots = 0;
    this.team.forEach(member => {
      if (member.faction === "Ouroboros") {
        ouro++;
      }
      if (member.faction === "Prometheus Fire") {
        promet++;
      }
      if (member.faction === "Thoth's Book") {
        thots++;
      }
      if (member.faction === "Athena's Aegis") {
        aegis++;
      }
    });

    this.ouroboros = ouro;
    this.prometheus = promet;
    this.thots = thots;
    this.aegis = aegis;
  }

  changeElement(element: MainElement | SkillElement, type: string, index: number): void {
    /* add element to this.teamComp[index].elements. You could also do this dynamically instead of all these if statements 
    // like this: this.teamComp[index].elements[type] but you'd have to add an index signature in elements
    // but then you won't be able to use simple elements.key anymore (like further below value.element) */
    if (type === "basic") {
      this.teamComp[index].elements.basic = element as SkillElement;
    }
    if (type === "skill") {
      this.teamComp[index].elements.skill = element as SkillElement;
    }
    if (type === "hyper") {
      this.teamComp[index].elements.hyper = element as SkillElement;
    }
    if (type === "passive") {
      this.teamComp[index].elements.passive = element as SkillElement;
    }
    if (type === "main") {
      this.teamComp[index].elements.main = element as MainElement;
    }

    this.countElements();
  }

  // count all main elements for each hero and also check if hero is nature blessed
  countElements(): void {
    let wind: number = 0, fire: number = 0, water: number = 0, lightning: number = 0, earth: number = 0, natureBlessed: number = 0;

    this.teamComp.forEach(hero => {
      let windBool: boolean = false, fireBool: boolean = false, waterBool: boolean = false;

      Object.entries(hero.elements).forEach(([key, value]) => {
        if (value.element === "Wind") {
          if (key === "main") wind++;
          windBool = true;
        }
        if (value.element === "Fire") {
          if (key === "main") fire++;
          fireBool = true;
        }
        if (value.element === "Water") {
          if (key === "main") water++;
          waterBool = true;
        }
        if (value.element === "Lightning") {
          if (key === "main") lightning++;
        }
        if (value.element === "Earth") {
          if (key === "main") earth++;
        }
      });

      if (windBool && fireBool && waterBool) natureBlessed++;

    });

    this.wind = wind;
    this.fire = fire;
    this.water = water;
    this.lightning = lightning;
    this.earth = earth;
    this.natureBlessed = natureBlessed;
  }

  changeStats(value: number, inputName: string, index: number): void {
    this.teamComp[index][inputName] = value;
  }

  changeSkill(skill: Skill, inputName: string, index: number): void {
    this.teamComp[index][inputName] = skill;
  }

  getPassiveAtkMultiplier(index: number): number {
    return ((this.teamComp[index].passive?.atk || 0) / 100 + 1) || 1;
  }

  getPassiveHpMultiplier(index: number): number {
    return ((this.teamComp[index].passive?.hp || 0) / 100 + 1) || 1;
  }

  getAtkWithoutPassive(index: number): number {
    return Math.ceil((this.teamComp[index].attack || 1) / this.getPassiveAtkMultiplier(index));
  }

  getHpWithoutPassive(index: number): number {
    return Math.ceil((this.teamComp[index].health || 1) / this.getPassiveHpMultiplier(index));
  }

  // atk + skill dmg + faction bonus + main element bonus + skill element bonus
  calcDamageOutput(skill: string, index: number): void {
    if (skill === "basicAtk") this.calcBasicDmg(index);
    if (skill === "skillAtk") this.calcSkillDmg(index);
    if (skill === "hyperAtk") this.calcHyperDmg(index);
    if (skill === "passiveAtk") {
      this.calcBasicDmg(index);
      this.calcSkillDmg(index);
      this.calcHyperDmg(index);
    }
  }

  calcDamageOutputAll(): void {
    for (let i = 0; i < this.teamDamage.length; i++) {
      if (this.team[i]) {
        this.calcBasicDmg(i);
        this.calcSkillDmg(i);
        this.calcHyperDmg(i);
      }
    }
  }

  calcBasicDmg(index: number): void {
    let baseValue = this.teamComp[index]?.attack || 0;
    let skillDmgMultiplier = ((this.teamComp[index].basicAtk?.damage || 0) / 100);
    let elementBonus = baseValue * 0.15;
    let mainElementDmg = this.getMainElementBonus(baseValue);
    let factionBonus = this.getFactionBonus(baseValue, index);
    let skillElementDmg = this.getSkillElementBonus(index, baseValue, "basic");
    let passiveBonus = this.getPassiveElementBonus(baseValue, index);
    let critMultiplier = this.getCritBonus(index);

    // min value
    let minDmg = (baseValue * skillDmgMultiplier) + mainElementDmg;
    this.teamDamage[index].basicAtkDmg.min = Math.floor(minDmg);

    // max value
    let maxDmg = ((baseValue * skillDmgMultiplier) + mainElementDmg + factionBonus +
      skillElementDmg + passiveBonus + elementBonus) * critMultiplier;
    this.teamDamage[index].basicAtkDmg.max = Math.floor(maxDmg);

    if (this.teamComp[index].elements.basic?.skillBonus?.extra) {
      this.teamDamage[index].basicAtkDmg.extra = (this.teamComp[index].elements.basic?.skillBonus?.extra || "");
    } else {
      this.teamDamage[index].basicAtkDmg.extra = "";
    }
  }

  calcSkillDmg(index: number): void {
    let baseValue = this.teamComp[index]?.attack || 0;
    let skillDmgMultiplier = ((this.teamComp[index].skillAtk?.damage || 0) / 100);
    let elementBonus = baseValue * 0.15;
    let mainElementDmg = this.getMainElementBonus(baseValue);
    let factionBonus = this.getFactionBonus(baseValue, index);
    let skillElementDmg = this.getSkillElementBonus(index, baseValue, "skill");
    let passiveBonus = this.getPassiveElementBonus(baseValue, index);
    let critMultiplier = this.getCritBonus(index);

    // min value
    let minDmg = (baseValue * skillDmgMultiplier) + mainElementDmg;
    this.teamDamage[index].skillAtkDmg.min = Math.floor(minDmg);

    // max value
    let maxDmg = ((baseValue * skillDmgMultiplier) + mainElementDmg + factionBonus +
      skillElementDmg + passiveBonus + elementBonus) * critMultiplier;
    this.teamDamage[index].skillAtkDmg.max = Math.floor(maxDmg);

    if (this.teamComp[index].elements.skill?.skillBonus?.extra) {
      this.teamDamage[index].skillAtkDmg.extra = (this.teamComp[index].elements.skill?.skillBonus?.extra || "");
    } else {
      this.teamDamage[index].skillAtkDmg.extra = "";
    }
  }

  calcHyperDmg(index: number): void {
    let baseValue = this.teamComp[index]?.attack || 0;
    let skillDmgMultiplier = ((this.teamComp[index].hyperAtk?.damage || 0) / 100);
    let elementBonus = baseValue * 0.15;
    let mainElementDmg = this.getMainElementBonus(baseValue);
    let factionBonus = this.getFactionBonus(baseValue, index);
    let skillElementDmg = this.getSkillElementBonus(index, baseValue, "hyper");
    let passiveBonus = this.getPassiveElementBonus(baseValue, index);
    let critMultiplier = this.getCritBonus(index);

    // min value
    let minDmg = (baseValue * skillDmgMultiplier) + mainElementDmg;
    this.teamDamage[index].hyperAtkDmg.min = Math.floor(minDmg);

    // max value
    let maxDmg = ((baseValue * skillDmgMultiplier) + mainElementDmg + factionBonus +
      skillElementDmg + passiveBonus + elementBonus) * critMultiplier;
    this.teamDamage[index].hyperAtkDmg.max = Math.floor(maxDmg);

    if (this.teamComp[index].elements.hyper?.skillBonus?.extra) {
      this.teamDamage[index].hyperAtkDmg.extra = (this.teamComp[index].elements.hyper?.skillBonus?.extra || "");
    } else {
      this.teamDamage[index].hyperAtkDmg.extra = "";
    }
  }

  getFactionBonus(value: number, index: number): number {
    if (this.ouroboros < 2 && this.prometheus < 3) return 0;

    if (this.prometheus >= 3) return Math.ceil(value * 0.5);

    if (this.ouroboros >= 2 && this.team[index]?.faction === "Ouroboros") return Math.ceil(value * 0.9);

    return 0;
  }

  getMainElementBonus(value: number): number {
    if (this.fire < 1) return 0;
    return value * (0.08 * this.fire);
  }

  // TODO: included type 2 in min damage calculation in the future.
  //0 = flat damage increase, 1 = additional basic attack, 2 = increase for each target, 3 = splash dmg, 4 = ignite, 5 = lightning totem passive
  getSkillElementBonus(index: number, value: number, key: string): number {
    let element = this.teamComp[index].elements[key];

    if (!element?.skillBonus) return 0;

    // current possible types: 0/1/2/4
    let type = element.skillBonus.type;
    switch (type) {
      case 0:
        return value * (element.skillBonus.scaling / 100);
      case 1:
        return (value * (this.teamComp[index].basicAtk?.damage || 0) / 100) + this.getMainElementBonus(value);
      case 2:
        // 7.5% * 4 possible targets
        return value * 0.3;
      case 4:
        // each round 10% of atk for 3 rounds
        return value * 0.3;
    }

    return 0;
  }

  getPassiveElementBonus(value: number, index: number): number {
    let element = this.teamComp[index].elements["passive"];
    // if it isnt the splash damage passive then delete the passive extra description
    if (!element?.passiveBonus) {
      this.teamDamage[index].passive = undefined;
      return 0;
    }
    if (element?.passiveBonus.type !== 3) this.teamDamage[index].passive = undefined;

    // current possible types: 0/3/5. 5 is calculated in getCritBonus() because formula would be wrong if calculated here
    let type = element.passiveBonus.type;
    switch (type) {
      case 0:
        return value * ((element.passiveBonus.scaling || 0) / 100);
      case 3:
        this.teamDamage[index].passive = "+30% splash damage";
        return 0;
    }

    return 0;
  }

  getCritBonus(index: number): number {
    let element = this.teamComp[index].elements.passive;

    if (element?.passiveBonus) {
      if (element.passiveBonus.type === 5) {
        if ((this.teamComp[index].crit || 0) < 1000) return 1.5;
        return 1.5 + ((this.teamComp[index].crit || 0) - 1000) * 0.002;
      }
    }

    return 1.5;
  }

  getWindMainSpeed(): number {
    if(this.wind >= 2) return 30 + this.wind * 30;
    return this.wind * 30;
  }

  // if element has requirement check if the requirement is met. if not add requirement text to description.
  checkRequirement(element: any, skillType: string, index: number): void {
    if (element.requirement) {
      // check type first
      if (element.requirement.type === 0) {
        let isAttackSkill: boolean = (skillType === "basic" || skillType === "skill" || skillType === "hyper");
        let minSpeed: number = (90 + 18 * (this.teamComp[index]?.level || 0));
        let requNotMet: boolean = ((this.teamComp[index].speed || 0) + this.getWindMainSpeed()) < minSpeed;

        // if element has requirement for attack AND element is on attack
        if (element.requirement.skill === "attack" && isAttackSkill) {
          if (requNotMet) {
            this.requirement = "not enough speed";
          } else {
            this.requirement = undefined;
          }
          // else if element has requirement for passive AND element is on passive
        } else if (element.requirement.skill === "passive" && skillType === "passive") {
          if (requNotMet) {
            this.requirement = "not enough speed";
          } else {
            this.requirement = undefined;
          }
        } else {
          this.requirement = undefined;
        }
      }
    } else {
      this.requirement = undefined;
    }
  }

  clearTeam(): void {
    this.team = [];
  }

  clearRequirement(): void {
    this.requirement = undefined;
  }

  saveTeamAsJson(): void {
    let teamArr = [];
    for (let i = 0; i < 4; i++) {
      // only save hero's that were actually selected
      if (this.team[i]) {
        let heroObj = {
          index: i,
          name: this.team[i].image,
          level: this.teamComp[i]?.level,
          attack: this.teamComp[i]?.attack,
          health: this.teamComp[i]?.health,
          speed: this.teamComp[i]?.speed,
          crit: this.teamComp[i]?.crit,
          passive: this.teamComp[i]?.passive?.level,
          basicAtk: this.teamComp[i]?.basicAtk?.level,
          skillAtk: this.teamComp[i]?.skillAtk?.level,
          hyperAtk: this.teamComp[i]?.hyperAtk?.level,
          mainElement: this.teamComp[i].elements.main?.name,
          basicElement: this.teamComp[i].elements.basic?.name,
          skillElement: this.teamComp[i].elements.skill?.name,
          hyperElement: this.teamComp[i].elements.hyper?.name,
          passiveElement: this.teamComp[i].elements.passive?.name
        }
        teamArr.push(heroObj);
      }
    }
    let file = new Blob([JSON.stringify(teamArr, null, 2)], { type: "application/json", });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "team.json";
    a.click();
  }

  setLastResponseAgo(heroes: any, rarities: number[]): void {
    this.timestamp = Date.now();
    for (let i = 0; i < heroes.length; i++) {
      this.heroAmounts[i] = heroes[i].amount;
    }
    for (let i = 0; i < rarities.length; i++) {
      this.rarityAmounts[i] = rarities[i];
    }
  }

  checkLastResponseTime(timestamp: number): boolean {
    if(!this.timestamp) return true;
    if(timestamp - this.timestamp < 5 * 60 * 1000) return false; // 5 * 60 * 1000 = 5 min
    return true;
  }

  getLastCardData(): number[] {
    return this.heroAmounts;
  }

  getLastRarityData(): number[] {
    return this.rarityAmounts;
  }
}