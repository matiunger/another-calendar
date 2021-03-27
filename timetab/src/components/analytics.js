export const logEvent = (event_name, parameters) => {
   let payload = parameters
   payload.event = event_name
   window.dataLayer = window.dataLayer || []
   window.dataLayer.push(payload)
   return;
};