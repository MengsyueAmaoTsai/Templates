import { resourceServiceSingleton } from "~/resources";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("resources", resourceServiceSingleton);
});
