import Search from "../pages/Search";

export default {
  name: "search",
  url: "/search",
	component: Search,
	params: {
		searchText: {
				type: "any",
				array: false
		},
		topic: {
			type: "any",
			array: false
		},
		subtopic: {
			type: "any",
			array: false
		}
	},
  resolve: [
		{
			token: "searchText",
			deps: ['$transition$'],
			resolveFn: (trans) => {
				return trans.params().searchText;
			},
		},
		{
			token: "topic",
			deps: ['$transition$'],
			resolveFn: (trans) => {
				return trans.params().topic;
			},
		},
		{
			token: "subtopic",
			deps: ['$transition$'],
			resolveFn: (trans) => {
				return trans.params().subtopic;
			},
		}
	]
};
