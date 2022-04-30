import Event from "../../structures/IEvent";

export = new Event('ready', () => {
    console.log("Ready!")
})