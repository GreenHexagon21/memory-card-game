export interface Card {
    id: number;
    pairId: number;
    state : 'default' | 'flipped' | 'matched';
    shape : string;
    picture : string;
}