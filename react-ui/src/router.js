import {
	UIRouterReact,
	servicesPlugin,
	hashLocationPlugin,
} from "@uirouter/react";
import search from "./states/searchState";
// Create router instance + setup
export const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);
// Start the router
// Register each state
const states = [search];
states.forEach((state) => router.stateRegistry.register(state));
