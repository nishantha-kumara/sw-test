import usersList from "./users.json";
import orgs from "./organizations.json";
import tickets from "./tickets.json";

export const users = usersList.map((user) => {
  const org = orgs.filter((org) => {
    const tick = tickets.filter((tkt) => tkt.organization_id === org._id);
    org.tickets = tick;
    return org._id === user.organization_id;
  });
  user.organizations = org;
  return user;
});
