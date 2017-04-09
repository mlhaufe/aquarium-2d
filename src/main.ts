import { sayHello } from "./greet";

function showHello(name: string) {
    const main = document.getElementsByTagName("main")[0];
    main.textContent = sayHello(name);
}

showHello("TypeScript");