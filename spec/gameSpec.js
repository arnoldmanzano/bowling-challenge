describe('Game', function() {
  var game;
  var frame1, frame2;

  beforeEach(function() {
    game = new Game();
    frame1 = jasmine.createSpyObj('frame1', ['showRolls', 'isSpare', 'isStrike']);
    frame2 = jasmine.createSpyObj('frame2', ['showRolls', 'isSpare', 'isStrike']);
    frame1.showRolls.and.returnValue([0, 0]);
  });

  describe('initializing a new Game', function() {
    it('starts out empty', function() {
      expect(game.frames).toEqual([]);
      expect(game.frameScores).toEqual([]);
      expect(game.currFrameNum).toEqual(0);
    });
  });

  describe('#addFrame', function() {
    it('adds frame to the game', function() {
      game.addFrame(frame1)
      expect(game.frames).toContain(frame1);
    });

    it('adds maximum frames to the game', function() {
      for (var i = 0; i<10; i++) { game.addFrame(frame1); }
      expect(function() {
        game.addFrame(frame2);
      }).toThrowError("Max frames");
      expect(game.frames).not.toContain(frame2);
    });
  });

  describe('frameScores', function() {
    it('keeps track of per frame scores in frameScores', function() {
      frame1.showRolls.and.returnValue([1, 2]);
      game.addFrame(frame1)
      frame1.showRolls.and.returnValue([4, 5]);
      game.addFrame(frame1)
      expect(game.frameScores).toContain(3);
      expect(game.frameScores).toContain(9);
    });

    it('can handle spare scoring correctly', function() {
      frame1.showRolls.and.returnValue([9, 1]);
      frame1.isSpare.and.returnValue(true);
      game.addFrame(frame1)
      game.addFrame(frame1)
      expect(game.frameScores).toContain(19);
    });

    it('can handle strike scoring correctly', function() {
      frame1.showRolls.and.returnValue([10]);
      frame1.isStrike.and.returnValue(true);
      game.addFrame(frame1)
      game.addFrame(frame1)
      expect(game.frameScores).toContain(20);
    });

    it('can handle three strikes scoring correctly', function() {
      frame1.showRolls.and.returnValue([10]);
      frame1.isStrike.and.returnValue(true);
      game.addFrame(frame1)
      game.addFrame(frame1)
      game.addFrame(frame1)
      expect(game.frameScores).toContain(30);
      expect(game.frameScores).toContain(20);
    });
  });

  describe('totalScore', function() {
    it('keeps track of the totalScore', function() {
      frame1.showRolls.and.returnValue([1, 2]);
      game.addFrame(frame1)
      game.addFrame(frame1)
      expect(game.totalScore).toEqual(6);
    });
  });
});
