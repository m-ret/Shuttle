// // Subscriptions for changes in the store. Primarily used for query params in usage dashboard
//
// import initSubscriber from 'redux-subscriber'; // Used to listen for changes in usage dashboard
//
// // Utils
// import updateHistory from '../utils/updateHistory';
//
// export default store => {
//   const subscribe = initSubscriber(store);
//
//   subscribe('usage.selectedGroup', state => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const { selectedGroup } = state.usage;
//     if (selectedGroup.length > 0) {
//       searchParams.set(
//         'groups',
//         encodeURIComponent(JSON.stringify(selectedGroup)),
//       );
//     } else {
//       searchParams.delete('groups');
//     }
//
//     const search = searchParams.toString();
//     updateHistory(search.length === 0 ? '' : `?${search}`);
//   });
//
//   subscribe('usage.selectedTimeFrame', state => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const { selectedTimeFrame } = state.usage;
//     searchParams.set('month', selectedTimeFrame[0].id);
//
//     const search = searchParams.toString();
//     updateHistory(search.length === 0 ? '' : `?${search}`);
//   });
// };
