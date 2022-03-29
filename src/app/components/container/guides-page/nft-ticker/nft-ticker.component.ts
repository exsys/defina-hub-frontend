import { Component, OnInit } from '@angular/core';

import { BackendService } from 'src/app/services/backend.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

import * as tooltipData from "../../../../shared/tooltips.json";

@Component({
  selector: 'app-nft-ticker',
  templateUrl: './nft-ticker.component.html',
  styleUrls: ['./nft-ticker.component.css']
})
export class NftTickerComponent implements OnInit {

  tooltips: any = (tooltipData as any).default;

  showModal: boolean = false;
  currentHero: any;

  selectedView: string = "hero";

  cardInfos: any = [
    { id: 1, name: "Dante", rarity: "SSS", image: "dante", percent: 23, faction: "prometheus", amount: null },
    { id: 2, name: "Hercules", rarity: "SS", image: "hercules", percent: 38, faction: "prometheus", amount: null },
    { id: 3, name: "Cervantes", rarity: "SS", image: "cervantes", percent: 24, faction: "prometheus", amount: null },
    { id: 4, name: "Beowulf", rarity: "S", image: "beowulf", percent: 23, faction: "prometheus", amount: null },
    { id: 5, name: "Yi Sun", rarity: "S", image: "yi-sun", percent: 23, faction: "prometheus", amount: null },
    { id: 6, name: "Mozart", rarity: "S", image: "mozart", percent: 23, faction: "prometheus", amount: null },
    { id: 7, name: "George", rarity: "A", image: "george", percent: 23, faction: "prometheus", amount: null },
    { id: 8, name: "Solomon", rarity: "SSS", image: "solomon", percent: 23, faction: "ouroboros", amount: null },
    { id: 9, name: "Alfred", rarity: "SS", image: "alfred", percent: 40, faction: "ouroboros", amount: null },
    { id: 10, name: "Oda", rarity: "SS", image: "nobunaga", percent: 22, faction: "ouroboros", amount: null },
    { id: 11, name: "Hasan", rarity: "S", image: "hasan", percent: 22, faction: "ouroboros", amount: null },
    { id: 12, name: "Nicolaus", rarity: "S", image: "nicolaus", percent: 22, faction: "ouroboros", amount: null },
    { id: 13, name: "Hugo", rarity: "S", image: "hugo", percent: 22, faction: "ouroboros", amount: null },
    { id: 14, name: "Erwin", rarity: "A", image: "erwin", percent: 22, faction: "ouroboros", amount: null },
    { id: 15, name: "Guanyu", rarity: "SSS", image: "guanyu", percent: 24, faction: "thots", amount: null },
    { id: 16, name: "Elizabeth", rarity: "SS", image: "elizabeth", percent: 24, faction: "thots", amount: null },
    { id: 17, name: "Helen", rarity: "SS", image: "helen", percent: 36, faction: "thots", amount: null },
    { id: 18, name: "Paris", rarity: "SS", image: "paris", percent: 21, faction: "thots", amount: null },
    { id: 19, name: "Homer", rarity: "S", image: "homer", percent: 21, faction: "thots", amount: null },
    { id: 20, name: "Florence", rarity: "S", image: "nightingale", percent: 21, faction: "thots", amount: null },
    { id: 21, name: "Akechi", rarity: "A", image: "akechi", percent: 21, faction: "thots", amount: null },
    { id: 22, name: "Morgan", rarity: "SSS", image: "morgan", percent: 22, faction: "aegis", amount: null },
    { id: 23, name: "Alexander", rarity: "SS", image: "alexander", percent: 25, faction: "aegis", amount: null },
    { id: 24, name: "Chopin", rarity: "SS", image: "chopin", percent: 23, faction: "aegis", amount: null },
    { id: 25, name: "Hanzo", rarity: "S", image: "hanzo", percent: 23, faction: "aegis", amount: null },
    { id: 26, name: "Cleopatra", rarity: "S", image: "cleopatra", percent: 23, faction: "aegis", amount: null },
    { id: 27, name: "Jeanne", rarity: "S", image: "jeanne", percent: 23, faction: "aegis", amount: null },
    { id: 28, name: "Zorro", rarity: "A", image: "zorro", percent: 27, faction: "aegis", amount: null },
  ];

  rarityInfos: any = [
    { index: 0, name: "SSS", amount: null },
    { index: 1, name: "SS", amount: null },
    { index: 2, name: "S", amount: null },
    { index: 3, name: "A", amount: null },
  ];

  // amounts is the total amount of each NFT. (taking blacklisted NFTs and NFT skins into consideration)
  amounts: number[] = [515, 1250, 1188, 3000, 3000, 3000, 12000, 507, 1250, 1187, 3000, 3000, 3000, 12000, 508, 830, 831, 840, 4500, 4500, 12000, 507, 1251, 1250, 3000, 3000, 3000, 12000];
  rarityAmounts: number[] = [2037, 10002, 36000, 48000];
  readonly okexOda: number = 63;
  readonly okexCervantes: number = 62;

  constructor(
    private backend: BackendService,
    private storage: DataStorageService,
  ) { }

  ngOnInit(): void {
    let allowReq: boolean = this.storage.checkLastResponseTime(Date.now());
    if (allowReq) {
      this.getCardInfo();
    } else {
      this.getCardInfoFromStorage();
    }
  }

  async getCardInfo(): Promise<void> {
    /* what information for which NFT comes back is defined in the backend. So if I want to add or remove heroes from the list
    /* I'll also have to update the backend */
    this.backend.getCardInfo().subscribe((res) => {
      // calculates the amount left for each NFT
      let temp: number[] = [2037, 10002, 36000, 48000];
      for (let i = 0; i < this.cardInfos.length; i++) {
        // NOTE: if you change the cardInfos array then don't forget to change the amounts array too.
        this.cardInfos[i].amount = this.amounts[i] - res.heroes[i].amount;

        if(this.cardInfos[i].rarity === "SSS") {
          temp[0] -= res.heroes[i].amount;
        }
        if(this.cardInfos[i].rarity === "SS") {
          temp[1] -= res.heroes[i].amount;
        }
        if(this.cardInfos[i].rarity === "S") {
          temp[2] -= res.heroes[i].amount;
        }
        if(this.cardInfos[i].rarity === "A") {
          temp[3] -= res.heroes[i].amount;
        }
      }

      temp[1] = temp[1] - (this.okexOda + this.okexCervantes);
      this.rarityInfos[0].amount = temp[0];
      this.rarityInfos[1].amount = temp[1];
      this.rarityInfos[2].amount = temp[2];
      this.rarityInfos[3].amount = temp[3];

      // only refresh data if last refresh was >5min ago. NOTE: this check is not working if the user simply refreshes the whole website
      this.storage.setLastResponseAgo(res.heroes, temp);
    }, error => {
      if(error.error.msg) {
        console.log(error.error.msg);
      } else {
        console.log("something went wrong...");
      }
    });
  }

  getCardInfoFromStorage(): void {
    let heroAmounts = this.storage.getLastCardData();
    let rarityAmounts = this.storage.getLastRarityData();

    for (let i = 0; i < heroAmounts.length; i++) {
      this.cardInfos[i].amount = this.amounts[i] - heroAmounts[i];
    }
    for (let i = 0; i < rarityAmounts.length; i++) {
      this.rarityInfos[i].amount = rarityAmounts[i];
    }
  }

  getHeroBarWidth(index: number): number {
    if (this.cardInfos[index].amount === null) return 0;
    let perc: number = this.cardInfos[index].amount / this.amounts[index];
    let corrPerc: number = Math.round((1 - perc) * 100);
    return corrPerc;
  }

  getRarityBarWidth(index: number): number {
    if (this.rarityInfos[index].amount === null) return 0;
    let perc: number = this.rarityInfos[index].amount / this.rarityAmounts[index];
    let corrPerc: number = Math.round((1 - perc) * 100);
    return corrPerc;
  }

  getTotalBarWidth(): number {
    if (this.rarityInfos[0].amount === null) return 0;

    let tempCurr: number = 0;
    let tempTotal: number = 0;
    for (let i = 0; i < this.rarityInfos.length; i++) {
      tempCurr += this.rarityInfos[i].amount;
      tempTotal += this.rarityAmounts[i];
    }

    
    let perc: number = tempCurr / tempTotal;
    let corrPerc: number = Math.round((1 - perc) * 100);
    return corrPerc;
  }

  getCurrentTotal(): number {
    if (this.rarityInfos[0].amount === null) return 0;

    let temp: number = 0;
    for (let rarity of this.rarityInfos) {
      temp += rarity.amount;
    }

    return temp;
  }

  showHero(hero: any): void {
    this.currentHero = hero;
    this.showModal = !this.showModal;
  }

  changeView(view: string): void {
    this.selectedView = view;
  }

  close(): void {
    this.showModal = false;
  }

}
