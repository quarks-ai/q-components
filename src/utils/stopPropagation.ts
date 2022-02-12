export default function callEvents(e: any, ...evts: any) {
  e.stopPropagation()

  evts.forEach((ev: any) => {
    ev(e)
  })
}
