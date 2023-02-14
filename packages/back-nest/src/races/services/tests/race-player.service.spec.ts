import { RacePlayer } from '../race-player.service';

describe('[unit] validKeyStrokes()', () => {
  const player = new RacePlayer();

  beforeEach(() => {
    const typedKeystrokes = [
      { correct: true, index: 1, key: 'f', timestamp: 1676334891980 },
      { correct: true, index: 2, key: 'u', timestamp: 1676334892242 },
      { correct: true, index: 3, key: 'n', timestamp: 1676334892503 },
      { correct: true, index: 4, key: 'c', timestamp: 1676334892503 },
    ];
    player.typedKeyStrokes = typedKeystrokes;
  });

  it('should include all valid keystrokes', () => {
    const validKeyStrokes = player.validKeyStrokes();
    expect(validKeyStrokes).toEqual(player.typedKeyStrokes);
  });

  it('should filter out invalid keystrokes all valid keystrokes', () => {
    const expectedValidKeystrokes = [...player.typedKeyStrokes];
    player.typedKeyStrokes.push({
      correct: false,
      index: 5,
      key: 'd',
      timestamp: 1676334892503,
    });
    const validKeyStrokes = player.validKeyStrokes();
    expect(validKeyStrokes).toEqual(expectedValidKeystrokes);
  });

  it('should use the latest timestamp for each index', () => {
    const expectedValidKeystrokes = [player.typedKeyStrokes[0]];
    player.typedKeyStrokes.push({
      correct: false,
      index: 2,
      key: 'd',
      timestamp: 1676334892503,
    });
    const validKeyStrokes = player.validKeyStrokes();
    expect(validKeyStrokes).toEqual(expectedValidKeystrokes);
  });
});

describe('[functional] validKeyStrokes()', () => {
  const player = new RacePlayer();
  player.typedKeyStrokes = [
    { correct: true, index: 1, key: 'f', timestamp: 1676392785787 },
    { correct: true, index: 2, key: 'u', timestamp: 1676392785931 },
    { correct: true, index: 3, key: 'n', timestamp: 1676392786176 },
    { correct: true, index: 4, key: 'c', timestamp: 1676392786253 },
    { correct: true, index: 5, key: ' ', timestamp: 1676392786343 },
    { correct: true, index: 6, key: 'n', timestamp: 1676392786485 },
    { correct: true, index: 7, key: 'e', timestamp: 1676392786572 },
    { correct: true, index: 8, key: 'w', timestamp: 1676392786630 },
    { correct: true, index: 9, key: 'W', timestamp: 1676392786851 },
    { correct: true, index: 10, key: 'a', timestamp: 1676392787083 },
    { correct: true, index: 11, key: 't', timestamp: 1676392787162 },
    { correct: true, index: 12, key: 'c', timestamp: 1676392787392 },
    { correct: true, index: 13, key: 'h', timestamp: 1676392787460 },
    { correct: true, index: 14, key: 'e', timestamp: 1676392787566 },
    { correct: true, index: 15, key: 'r', timestamp: 1676392787696 },
    { correct: true, index: 16, key: 'G', timestamp: 1676392787997 },
    { correct: false, index: 17, key: 'B', timestamp: 1676392788000 },
    { correct: false, index: 18, key: 'r', timestamp: 1676392788196 },
    { correct: true, index: 17, key: 'r', timestamp: 1676392788777 },
    { correct: false, index: 18, key: 'u', timestamp: 1676392788952 },
    { correct: false, index: 19, key: 'o', timestamp: 1676392788963 },
    { correct: false, index: 20, key: 'o', timestamp: 1676392789165 },
    { correct: true, index: 18, key: 'o', timestamp: 1676392790150 },
    { correct: true, index: 19, key: 'u', timestamp: 1676392790279 },
    { correct: true, index: 20, key: 'p', timestamp: 1676392790365 },
    { correct: true, index: 21, key: '(', timestamp: 1676392790776 },
    { correct: true, index: 22, key: ')', timestamp: 1676392790847 },
    { correct: true, index: 23, key: ' ', timestamp: 1676392791108 },
    { correct: true, index: 24, key: 'w', timestamp: 1676392791308 },
    { correct: true, index: 25, key: 'a', timestamp: 1676392791492 },
    { correct: true, index: 26, key: 't', timestamp: 1676392791555 },
    { correct: true, index: 27, key: 'c', timestamp: 1676392791771 },
    { correct: true, index: 28, key: 'h', timestamp: 1676392791852 },
    { correct: true, index: 29, key: 'e', timestamp: 1676392791944 },
    { correct: true, index: 30, key: 'r', timestamp: 1676392792046 },
    { correct: true, index: 31, key: 'G', timestamp: 1676392792307 },
    { correct: true, index: 32, key: 'r', timestamp: 1676392792494 },
    { correct: true, index: 33, key: 'o', timestamp: 1676392792554 },
    { correct: true, index: 34, key: 'u', timestamp: 1676392792659 },
    { correct: true, index: 35, key: 'p', timestamp: 1676392792729 },
    { correct: true, index: 36, key: ' ', timestamp: 1676392792882 },
    { correct: true, index: 37, key: '{', timestamp: 1676392793137 },
    { correct: true, index: 40, key: '\n', timestamp: 1676392793228 },
    { correct: true, index: 41, key: 'r', timestamp: 1676392793933 },
    { correct: true, index: 42, key: 'e', timestamp: 1676392794021 },
    { correct: true, index: 43, key: 't', timestamp: 1676392794141 },
    { correct: true, index: 44, key: 'u', timestamp: 1676392794197 },
    { correct: true, index: 45, key: 'r', timestamp: 1676392794324 },
    { correct: true, index: 46, key: 'n', timestamp: 1676392794454 },
    { correct: true, index: 41, key: 'r', timestamp: 1676392795190 },
    { correct: true, index: 42, key: 'e', timestamp: 1676392795299 },
    { correct: true, index: 43, key: 't', timestamp: 1676392795410 },
    { correct: true, index: 44, key: 'u', timestamp: 1676392795468 },
    { correct: true, index: 45, key: 'r', timestamp: 1676392795601 },
    { correct: true, index: 46, key: 'n', timestamp: 1676392795683 },
    { correct: true, index: 47, key: ' ', timestamp: 1676392796151 },
    { correct: true, index: 48, key: 'w', timestamp: 1676392796361 },
    { correct: true, index: 49, key: 'a', timestamp: 1676392796514 },
    { correct: true, index: 50, key: 't', timestamp: 1676392796588 },
    { correct: true, index: 51, key: 'c', timestamp: 1676392796827 },
    { correct: true, index: 52, key: 'h', timestamp: 1676392796909 },
    { correct: true, index: 53, key: 'e', timestamp: 1676392797008 },
    { correct: true, index: 54, key: 'r', timestamp: 1676392797116 },
    { correct: true, index: 55, key: 'G', timestamp: 1676392797496 },
    { correct: true, index: 56, key: 'r', timestamp: 1676392797730 },
    { correct: true, index: 57, key: 'o', timestamp: 1676392797808 },
    { correct: true, index: 58, key: 'u', timestamp: 1676392797910 },
    { correct: true, index: 59, key: 'p', timestamp: 1676392797968 },
    { correct: true, index: 60, key: '{', timestamp: 1676392798346 },
    { correct: true, index: 65, key: '\n', timestamp: 1676392798497 },
    { correct: true, index: 66, key: 'k', timestamp: 1676392800709 },
    { correct: true, index: 67, key: 'e', timestamp: 1676392800788 },
    { correct: true, index: 68, key: 'y', timestamp: 1676392800894 },
    { correct: true, index: 69, key: 'W', timestamp: 1676392801060 },
    { correct: true, index: 70, key: 'a', timestamp: 1676392801287 },
    { correct: true, index: 71, key: 't', timestamp: 1676392801399 },
    { correct: true, index: 72, key: 'c', timestamp: 1676392801635 },
    { correct: true, index: 73, key: 'h', timestamp: 1676392801724 },
    { correct: true, index: 74, key: 'e', timestamp: 1676392801810 },
    { correct: true, index: 75, key: 'r', timestamp: 1676392801933 },
    { correct: true, index: 76, key: 's', timestamp: 1676392802024 },
    { correct: false, index: 66, key: 'd', timestamp: 1676392804327 },
    { correct: false, index: 67, key: 'e', timestamp: 1676392804543 },
    { correct: false, index: 68, key: 'y', timestamp: 1676392804700 },
    { correct: false, index: 69, key: 'W', timestamp: 1676392804958 },
    { correct: false, index: 70, key: 'a', timestamp: 1676392805036 },
    { correct: false, index: 71, key: 't', timestamp: 1676392806184 },
    { correct: false, index: 72, key: 'c', timestamp: 1676392806433 },
    { correct: false, index: 73, key: 'h', timestamp: 1676392806553 },
    { correct: false, index: 74, key: 'e', timestamp: 1676392806625 },
    { correct: false, index: 75, key: 'r', timestamp: 1676392806753 },
    { correct: false, index: 76, key: 's', timestamp: 1676392806850 },
    { correct: false, index: 77, key: ':', timestamp: 1676392807263 },
    { correct: true, index: 66, key: 'k', timestamp: 1676392808209 },
    { correct: true, index: 67, key: 'e', timestamp: 1676392808311 },
    { correct: true, index: 68, key: 'y', timestamp: 1676392808401 },
    { correct: true, index: 69, key: 'W', timestamp: 1676392808559 },
    { correct: true, index: 70, key: 'a', timestamp: 1676392808736 },
    { correct: true, index: 71, key: 't', timestamp: 1676392808809 },
    { correct: true, index: 72, key: 'c', timestamp: 1676392809050 },
    { correct: true, index: 73, key: 'h', timestamp: 1676392809118 },
    { correct: true, index: 74, key: 'e', timestamp: 1676392809227 },
    { correct: true, index: 75, key: 'r', timestamp: 1676392809328 },
    { correct: true, index: 76, key: 's', timestamp: 1676392809396 },
    { correct: true, index: 77, key: ':', timestamp: 1676392809639 },
    { correct: true, index: 78, key: ' ', timestamp: 1676392809832 },
    { correct: true, index: 79, key: 'm', timestamp: 1676392810011 },
    { correct: true, index: 80, key: 'a', timestamp: 1676392810089 },
    { correct: true, index: 81, key: 'k', timestamp: 1676392810198 },
    { correct: true, index: 82, key: 'e', timestamp: 1676392810274 },
    { correct: true, index: 83, key: '(', timestamp: 1676392810520 },
    { correct: true, index: 84, key: 'w', timestamp: 1676392810915 },
    { correct: true, index: 85, key: 'a', timestamp: 1676392811118 },
    { correct: true, index: 86, key: 't', timestamp: 1676392811218 },
    { correct: true, index: 87, key: 'c', timestamp: 1676392811442 },
    { correct: true, index: 88, key: 'h', timestamp: 1676392811538 },
    { correct: true, index: 89, key: 'e', timestamp: 1676392811649 },
    { correct: true, index: 90, key: 'r', timestamp: 1676392811760 },
    { correct: true, index: 91, key: 'S', timestamp: 1676392811955 },
    { correct: true, index: 92, key: 'e', timestamp: 1676392812097 },
    { correct: true, index: 93, key: 't', timestamp: 1676392812197 },
    { correct: true, index: 94, key: 'B', timestamp: 1676392812554 },
    { correct: true, index: 95, key: 'y', timestamp: 1676392812704 },
    { correct: true, index: 96, key: 'K', timestamp: 1676392812921 },
    { correct: true, index: 97, key: 'e', timestamp: 1676392813049 },
    { correct: true, index: 98, key: 'y', timestamp: 1676392813137 },
    { correct: true, index: 99, key: ')', timestamp: 1676392813359 },
    { correct: true, index: 100, key: ',', timestamp: 1676392813650 },
    { correct: true, index: 105, key: '\n', timestamp: 1676392813778 },
    { correct: true, index: 106, key: 'r', timestamp: 1676392814158 },
    { correct: true, index: 107, key: 'a', timestamp: 1676392814246 },
    { correct: true, index: 108, key: 'n', timestamp: 1676392814333 },
    { correct: true, index: 109, key: 'g', timestamp: 1676392814444 },
    { correct: true, index: 110, key: 'e', timestamp: 1676392814518 },
    { correct: true, index: 111, key: 's', timestamp: 1676392814609 },
    { correct: true, index: 112, key: ':', timestamp: 1676392814749 },
    { correct: true, index: 113, key: ' ', timestamp: 1676392815613 },
    { correct: true, index: 114, key: ' ', timestamp: 1676392815800 },
    { correct: true, index: 115, key: ' ', timestamp: 1676392815972 },
    { correct: true, index: 116, key: ' ', timestamp: 1676392816163 },
    { correct: true, index: 117, key: ' ', timestamp: 1676392816369 },
    { correct: true, index: 118, key: ' ', timestamp: 1676392816606 },
    { correct: true, index: 119, key: 'a', timestamp: 1676392817044 },
    { correct: true, index: 120, key: 'd', timestamp: 1676392817074 },
    { correct: true, index: 121, key: 't', timestamp: 1676392817262 },
    { correct: true, index: 122, key: '.', timestamp: 1676392817743 },
    { correct: true, index: 123, key: 'N', timestamp: 1676392818028 },
    { correct: true, index: 124, key: 'e', timestamp: 1676392818220 },
    { correct: true, index: 125, key: 'w', timestamp: 1676392818308 },
    { correct: true, index: 126, key: 'I', timestamp: 1676392818497 },
    { correct: false, index: 127, key: 'N', timestamp: 1676392818602 },
    { correct: false, index: 128, key: 't', timestamp: 1676392818801 },
    { correct: false, index: 129, key: 'e', timestamp: 1676392818895 },
    { correct: true, index: 127, key: 'n', timestamp: 1676392819553 },
    { correct: true, index: 128, key: 't', timestamp: 1676392819712 },
    { correct: true, index: 129, key: 'e', timestamp: 1676392819808 },
    { correct: true, index: 130, key: 'r', timestamp: 1676392819998 },
    { correct: true, index: 131, key: 'v', timestamp: 1676392820243 },
    { correct: true, index: 132, key: 'a', timestamp: 1676392820349 },
    { correct: true, index: 133, key: 'l', timestamp: 1676392820416 },
    { correct: true, index: 134, key: 'T', timestamp: 1676392820902 },
    { correct: true, index: 135, key: 'r', timestamp: 1676392821122 },
    { correct: true, index: 136, key: 'e', timestamp: 1676392821196 },
    { correct: true, index: 137, key: 'e', timestamp: 1676392821343 },
    { correct: true, index: 138, key: '(', timestamp: 1676392821550 },
    { correct: true, index: 139, key: ')', timestamp: 1676392821785 },
    { correct: true, index: 140, key: ',', timestamp: 1676392821968 },
    { correct: true, index: 145, key: '\n', timestamp: 1676392822798 },
    { correct: true, index: 146, key: 'w', timestamp: 1676392823218 },
    { correct: true, index: 147, key: 'a', timestamp: 1676392823403 },
    { correct: true, index: 148, key: 't', timestamp: 1676392823537 },
    { correct: true, index: 149, key: 'c', timestamp: 1676392823771 },
    { correct: true, index: 150, key: 'h', timestamp: 1676392823848 },
    { correct: true, index: 151, key: 'e', timestamp: 1676392823954 },
    { correct: true, index: 152, key: 'r', timestamp: 1676392824086 },
    { correct: true, index: 153, key: 's', timestamp: 1676392824116 },
    { correct: true, index: 154, key: ':', timestamp: 1676392824376 },
    { correct: true, index: 155, key: ' ', timestamp: 1676392824700 },
    { correct: true, index: 156, key: ' ', timestamp: 1676392824882 },
    { correct: true, index: 157, key: ' ', timestamp: 1676392825040 },
    { correct: true, index: 158, key: ' ', timestamp: 1676392825547 },
    { correct: true, index: 159, key: 'm', timestamp: 1676392825845 },
    { correct: true, index: 160, key: 'a', timestamp: 1676392825913 },
    { correct: true, index: 161, key: 'k', timestamp: 1676392826036 },
    { correct: true, index: 162, key: 'e', timestamp: 1676392826111 },
    { correct: true, index: 163, key: '(', timestamp: 1676392826422 },
    { correct: true, index: 164, key: 'w', timestamp: 1676392826766 },
  ];

  it('should include the last correct keystroke', () => {
    const expectedInput =
      'func newWatcherGroup() watcherGroup {\nreturn watcherGroup{\nkeyWatchers: make(watcherSetByKey),\nranges:      adt.NewIntervalTree(),\nwatchers:    make(w';

    const validKeyStrokes = player.validKeyStrokes();

    const actualInput = validKeyStrokes.map((stroke) => stroke.key).join('');

    expect(actualInput).toBe(expectedInput);
  });
});
