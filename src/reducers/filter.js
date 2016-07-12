export default function update(state = initialState, action) {
  if (action.type === "DUMMY") {
    // @@TODO - apply filtering via params - 
    // action type should approximate data handler pipelin
    // or could delegate to data handler pipeline
    console.log("Dummy reducer", state, action);
    return state;
  }
}
