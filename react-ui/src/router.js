import {
	UIRouterReact,
	servicesPlugin,
	hashLocationPlugin,
	pushStateLocationPlugin
} from "@uirouter/react";
import search from "./states/searchState";
// Create router instance + setup
export const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);
router.plugin(pushStateLocationPlugin);
// Start the router
// Register each state
const states = [search];
states.forEach((state) => router.stateRegistry.register(state));
