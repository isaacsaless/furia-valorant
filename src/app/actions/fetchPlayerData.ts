export async function FetchPlayerData(){
    try {
        const response = await fetch("https://furia-valorant.vercel.app/api/searchPlayers");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}