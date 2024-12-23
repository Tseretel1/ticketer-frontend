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
    creatorRegistration :string;
    restorePassword :string;
    editProfile:string;
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
    ticketCategories : "/ticket/genre/",
    userProfile :"/user-profile",
    editProfile :"/edit-profile",
    searchResult :"/search/",
    creatorRegistration : "/register-as-creator",
    restorePassword :'/restore-password'
};

export const BaseURL : any = 
{
    URL : "http://192.168.1.10:7081/",
    CreatorURL : "http://192.168.1.10:7081/api/Creator/",
}