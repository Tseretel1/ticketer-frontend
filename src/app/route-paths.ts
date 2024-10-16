export interface Routes {
    ticket: string;
    login: string;
    userProfile:string;
    ticketCategories :string;
    fullticket: string;
    creator: string;
    creatorProfile: string;
    creatorCrud: string;
    creatorScanner: string;
    creatorTicketManagement: string;
    searchResult :string;
}

export const appRoutes: Routes = {
    ticket: "/tickets",
    login: "/login",
    fullticket: "/full-ticket/",
    creator: "/event-creator",
    creatorProfile: "/event-creator/creator-profile",
    creatorCrud: "/event-creator/crud/",
    creatorScanner: "/event-creator/scanner",
    creatorTicketManagement: "/event-creator/ticket-management",
    ticketCategories : "/ticket-categories/",
    userProfile :"/user-profile",
    searchResult :"/search/"
};
