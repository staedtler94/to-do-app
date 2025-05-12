class IndexController {
    public getIndex(req: Request, res: Response): void {
        res.send("Welcome to the To-Do App!");
    }

    public getItems(req: Request, res: Response): void {
        // Logic to retrieve items
        res.send("List of items");
    }

    public addItem(req: Request, res: Response): void {
        // Logic to add an item
        res.send("Item added");
    }

    public deleteItem(req: Request, res: Response): void {
        // Logic to delete an item
        res.send("Item deleted");
    }
}

export default IndexController;