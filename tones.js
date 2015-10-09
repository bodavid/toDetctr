    var sampleSize = 2000;
    var sampleRate = 44100; // Or whatever in use (Hz)
    var tone = 500; // tone to detect in Hz
    var sin500Hz = Array(sampleSize);
    var cos500Hz = Array(sampleSize);
    for (var i = 0; i < sampleSize; i++) {
      sin500Hz[i] = Math.sin(2*Math.PI*tone/sampleRate*i)/Math.sqrt(sampleSize);
      cos500Hz[i] = Math.cos(2*Math.PI*tone/sampleRate*i)/Math.sqrt(sampleSize);
    }

    function findTone(inputSamples) {
      var amplitudeSin = 0;
      var amplitudeCos = 0;
      for (var i = 0; i < sampleSize; i++) {
        amplitudeSin += inputSamples[i]*sin500Hz[i];
        amplitudeCos += inputSamples[i]*cos500Hz[i];
      }
      return Math.sqrt(amplitudeSin*amplitudeSin + amplitudeCos*amplitudeCos);
    }

    function noiseLevel(inputSamples) {
      var power = 0;
      var average = 0;
      for (var i = 0; i < sampleSize; i++) {
        average += inputSamples[i];
      }
      average /= Math.sqrt(sampleSize);
      for (var i = 0; i < sampleSize; i++) {
        power += Math.pow(inputSamples[i] - average, 2);
      }
      return Math.sqrt(power);
    }