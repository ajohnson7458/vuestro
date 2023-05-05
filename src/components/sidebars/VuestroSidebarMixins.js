/* global _ */
export default {
  methods: {
    isShown(role, route) {
      function makeArray(d) {
        if (!_.isArray(d)) {
          return [d];
        }
        return d;
      }
      if (route.meta) {
        if (route.meta.sidebar || route.meta.sidebarBottom) {
          if (route.meta.role) {
            if (typeof route.meta.role == 'object' && typeof role == 'object') {
              for (let item in route.meta.role){
                if (!role[item] || !route.meta.role[item]){
                  return false;
                }
                if (role[item] < route.meta.role[item]){
                  return false;
                }
              }
              return true;
            } else if (route.meta.role === role) {
              return true;
            } else if (_.intersection(makeArray(route.meta.role), makeArray(role)).length > 0) {
              return true;
            }
          } else if (route.meta.showFunc) {
            return route.meta.showFunc(route);
          } else {
            return true;
          }
        }
      }
      return false;
    },
  },
};