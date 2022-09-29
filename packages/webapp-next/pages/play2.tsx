import { CodeTypingContainer } from "../modules/play2/containers/CodeTypingContainer";

let code = `func (r EtcdManualResolver) updateState() {
  if r.CC != nil {
    addresses := make([]resolver.Address, len(r.endpoints))
    for i, ep := range r.endpoints {
      addr, serverName := endpoint.Interpret(ep)
      addresses[i] = resolver.Address{Addr: addr, ServerName: serverName}
    }
    state := resolver.State{
      Addresses:     addresses,
      ServiceConfig: r.serviceConfig,
    }
    r.UpdateState(state)
  }
}`;

code = `fn to_tokens(&self, tokens: &mut TokenStream) {
  let (origin, span) = (self.0, self.1);
  let origin = origin.clone().into_normalized();
  define_spanned_export!(span => _uri);
  let path = origin.path().as_str();
  let query = Optional(origin.query().map(|q| q.as_str()));
  tokens.extend(quote_spanned! { span =>
    #_uri::Origin::const_new(#path, #query)
  });
}`;

function Play2Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row justify-start text-white w-full">hi</div>
      <CodeTypingContainer code={code} />
    </div>
  );
}

export default Play2Page;
