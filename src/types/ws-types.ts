export enum WebSocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
  }
  
  export interface IFeedItem {
    
    "ingredients": string[],
    "_id": string,
    "name": string,
    "status": "done"|"created"|"pending",
    "number": number,
    "createdAt": string,
    "updatedAt": string
  }
  
  export type FeedData = {
    success: boolean;
    orders:Array<IFeedItem>;
    total: number;
    totalToday: number;
  }
  
  export enum BurgerActionType {
    DATA = 'data',
    INSERT = 'insert',
    DELETE = 'delete',
    UPDATE = 'update',
    MOVE = 'move',
  }
  
  export type Data = {
    type: BurgerActionType.DATA,
    data: FeedData
  }
  
  export type Insert = {
    type: BurgerActionType.INSERT,
    data: {
        rows: Array<IFeedItem>,
        pos: number
    }
  }
  
  export type Update = {
    type: BurgerActionType.UPDATE,
    data: FeedData
  }
  
  export type Delete = {
    type: BurgerActionType.DELETE,
    data: Array<number>
  }
  
  export type Move = {
    type: BurgerActionType.MOVE,
    data: Array<{from: number, to: number}>
  }
  
  export type FeedAction = Insert | Data | Delete | Update | Move;
  
  export type FeedActions = Array<FeedAction>;
  