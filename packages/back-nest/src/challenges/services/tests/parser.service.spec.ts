import { getFormattedText } from '../parser.service';

const dubbleNewLineInput = `func newGRPCProxyCommand() *cobra.Command {
  lpc := &cobra.Command{
    Use:   "grpc-proxy <subcommand>",
    Short: "grpc-proxy related command",
  }
  lpc.AddCommand(newGRPCProxyStartCommand())

  return lpc
}`;

const trippleNewLineInput = `func newGRPCProxyCommand() *cobra.Command {
  lpc := &cobra.Command{
    Use:   "grpc-proxy <subcommand>",
    Short: "grpc-proxy related command",
  }
  lpc.AddCommand(newGRPCProxyStartCommand())


  return lpc
}`;

const inputWithTabs = `func newGRPCProxyCommand() *cobra.Command {
\tlpc := &cobra.Command{
\t\tUse:   "grpc-proxy <subcommand>",
\t\tShort: "grpc-proxy related command",
\t}
\tlpc.AddCommand(newGRPCProxyStartCommand())
\treturn lpc
}`;

const output = `func newGRPCProxyCommand() *cobra.Command {
  lpc := &cobra.Command{
    Use:   "grpc-proxy <subcommand>",
    Short: "grpc-proxy related command",
  }
  lpc.AddCommand(newGRPCProxyStartCommand())
  return lpc
}`;

describe('getFormattedText', () => {
  it('should remove double newlines', () => {
    const parsed = getFormattedText(dubbleNewLineInput);
    expect(parsed).toEqual(output);
  });
  it('should remove tripple newlines', () => {
    const parsed = getFormattedText(trippleNewLineInput);
    expect(parsed).toEqual(output);
  });
  it('should replace tabs with spaces', () => {
    const parsed = getFormattedText(trippleNewLineInput);
    expect(parsed).toEqual(output);
  });
});
