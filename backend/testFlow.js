import fetch from "node-fetch";

const API_BASE = "http://localhost:4000";

async function testFlow() {
  try {
    const password = "123456";

    // 1️⃣ Register first player (Team Owner)
    const ownerEmail = `owner${Date.now()}@example.com`;
    const registerOwnerRes = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Captain Max",
        email: ownerEmail,
        password,
        role: "PLAYER"
      })
    });
    const registerOwnerData = await registerOwnerRes.json();
    console.log("Register Owner response:", registerOwnerData);

    // 2️⃣ Login Owner
    const loginOwnerRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: ownerEmail, password })
    });
    const loginOwnerData = await loginOwnerRes.json();
    console.log("Login Owner response:", loginOwnerData);

    const ownerToken = loginOwnerData.token;
    const ownerId = loginOwnerData.user.id;
    if (!ownerToken) throw new Error("Owner login failed, no token returned");

    // 3️⃣ Create a team as Owner
    const createTeamRes = await fetch(`${API_BASE}/teams/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ownerToken}`
      },
      body: JSON.stringify({ name: "Thunder Wolves", description: "Weekend warriors" })
    });
    const teamData = await createTeamRes.json();
    console.log("Create Team response:", teamData);

    const teamId = teamData.id;
    if (!teamId) throw new Error("Team creation failed");

    // 4️⃣ Register second player (to join team)
    const playerEmail = `player${Date.now()}@example.com`;
    const registerPlayerRes = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Striker Leo",
        email: playerEmail,
        password,
        role: "PLAYER"
      })
    });
    const registerPlayerData = await registerPlayerRes.json();
    console.log("Register Player response:", registerPlayerData);

    // 5️⃣ Login second player
    const loginPlayerRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: playerEmail, password })
    });
    const loginPlayerData = await loginPlayerRes.json();
    console.log("Login Player response:", loginPlayerData);

    const playerToken = loginPlayerData.token;
    const playerId = loginPlayerData.user.id;
    if (!playerToken) throw new Error("Player login failed, no token returned");

    // 6️⃣ Player requests to join team
    /*const joinTeamRes = await fetch(`${API_BASE}/teams/${teamId}/join`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${playerToken}` }
    });
    const joinTeamData = await joinTeamRes.json();
    console.log("Join Team response:", joinTeamData);*/

    // 7️⃣ Owner invites the player (using userId now)
    const invitePlayerRes = await fetch(`${API_BASE}/teams/${teamId}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ownerToken}`
      },
      body: JSON.stringify({ userId: playerId }) // invite by userId
    });
    const inviteData = await invitePlayerRes.json();
    console.log("Invite Player response:", inviteData);

    // 8️⃣ Player accepts the invite
    const acceptInviteRes = await fetch(`${API_BASE}/teams/${teamId}/accept`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${playerToken}` }
    });
    const acceptData = await acceptInviteRes.json();
    console.log("Accept Invite response:", acceptData);

    // 9️⃣ List all teams
    const listTeamsRes = await fetch(`${API_BASE}/teams`, {
      headers: { Authorization: `Bearer ${ownerToken}` }
    });
    const listData = await listTeamsRes.json();
    console.log("List Teams response:", listData);

    console.log("✅ Full team flow test completed successfully");

  } catch (err) {
    console.error("Error in test flow:", err);
  }
}

testFlow();
