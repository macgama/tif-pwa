export default function({ store, redirect, error }) {
    console.log("Entering auth-check")
    if (!store.getters["users/loadedUser"]) {
        console.log("Unauthenticated, redirect to index")
        return redirect("/")
    }
}
