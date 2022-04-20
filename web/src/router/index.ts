import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
	{
	  path: "/",
	  name: "webTeamLogin",
	  redirect:"/login",
	  component: () => import("../views/webTeamLogin.vue"),
		children:[{
			path: "/login",
			name: "login",
			component: () => import("../views/login.vue"),
		},{
			path: "/register",
			name: "register",
			component: () => import("../views/register.vue"),
		},{
			path: "/forgetIndex",
			name: "forgetIndex",
			component: () => import("../views/forget.vue"),
		}]
	},
	{
		path: "/webTeam",
		name: "webTeam",
		component: () => import("../views/webTeam.vue"),
		children:[{
			path: "/community",
			name: "community",
			component: () => import("../views/children/community.vue"),
		},{
			path: "/communityDetail",
			name: "communityDetail",
			component: () => import("../views/community/communityDetail.vue"),
		},{
			path: "/communityPublic",
			name: "communityPublic",
			component: () => import("../views/community/communityPublic.vue"),
		},{
			path: "/public",
			name: "public",
			component: () => import("../views/my/my-public.vue"),
		},{
			path: "/star",
			name: "star",
			component: () => import("../views/my/my-star.vue"),
		},{
			path: "/news",
			name: "news",
			component: () => import("../views/my/my-news.vue"),
		},{
			path: "/set",
			name: "set",
			component: () => import("../views/my/my-set.vue"),
		},{
			path: "/revise",
			name: "revise",
			component: () => import("../views/my/my-revise.vue"),
		},{
			path: "/forget",
			name: "forget",
			component: () => import("../views/my/my-forget.vue"),
		}]
	},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
