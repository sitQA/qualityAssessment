describe('WeightedAverageStrategy', () => {

    let qe = new QualityEstimator();
    let score = qe.calcQuality(situation);
    it('should calculate quality', () => {
        score.should.be.a('number');
    });

    it('quality should be the arithmetic average of both conditions if no weights are specified', ()=> {
        expect(score).to.equal((0.65 + 0.7)/2)
    });

    it('should use weights if they are specified', () => {
        expect(score)
    })

});