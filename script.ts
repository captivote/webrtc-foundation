function getInfo(options?: RTCOfferOptions) {

  // <ref src="https://stackoverflow.com/a/32841164">
  const findIP: Promise<string> = new Promise(r => {
    const w = window,
      a = new (w.RTCPeerConnection || (w as any).mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }),
      b = () => {};
    a.createDataChannel('');
    a.createOffer((options: RTCOfferOptions) => {
      a.setLocalDescription(options);
      return options;
    });
    a.onicecandidate = c => {
      try {
        const m = (c.candidate != null && c.candidate.candidate != null) ?
          c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g)
          : null;
        if (m != null)
          m.forEach(r)
      } catch (e) {}
    }
  });

  /*Usage example*/
  findIP.then(ip => document.write('your ip: ', ip)).catch(e => console.error(e));
  // <ref src="https://stackoverflow.com/a/32841164"/>


  // <ref src="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Using_data_channels">
  const pc = new RTCPeerConnection();
  let dataChannel = pc.createDataChannel('MyApp Channel', {
    negotiated: true
  });

  dataChannel.addEventListener('open', (event) => {
    console.info('opened::dataChannel:', dataChannel, '\tevent:', event);
  });

  console.info('dataChannel.id:', dataChannel.id);
  // <ref src="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Using_data_channels"/>

  return window.navigator.userAgent;
}
