export class Page {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    changedAt: Date;
    tags: string[];
    hasPassword: boolean;
    isPinned: boolean;
    parentId: number;
    author: number;
    category: number;

    
    constructor(title: string, content: string, id?: number){
        this.title = title;
        this.content = content;
        this.id = id;
    }
}