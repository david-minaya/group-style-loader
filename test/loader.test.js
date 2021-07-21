import { runWebpack } from './runWebpack.js';

it('group the styles using the default separator "_"', async () => {
  const { style } = await runWebpack('style.js');
  expect(style).toEqual(expect.objectContaining({
    app: expect.any(String),
    card: {
      title: expect.any(String),
      description: expect.any(String)
    }
  }));
});

it('group the styles using the separator "_GROUP_"', async () => {
  const { style } = await runWebpack('custom-separator.js', { separator: '_GROUP_' });
  expect(style).toEqual(expect.objectContaining({
    app: expect.any(String),
    card: {
      title: expect.any(String),
      description: expect.any(String)
    }
  }));
});

it('merge the default styles with the custom styles', async () => {
  
  const result = await runWebpack('merge-style.js');
  const { defaultStyle, customStyle, mergedStyle } = result;

  const expected = {
    title: `${defaultStyle.title} ${customStyle.title}`,
    description: `${defaultStyle.description} ${customStyle.description}` 
  }

  expect(expected).toEqual(mergedStyle);
});

it('set valid options to the loader', async () => {
  await runWebpack('style.js', { separator: '_GROUP_' });
});

it('throw an execption when the loader options are invalid', async () => {

  let thrownTheExecption = false;

  try {
    await runWebpack('style.js', { invalidOption: 'invalid' });
  } catch (err) { 
    thrownTheExecption = true;
  }

  if (!thrownTheExecption) {
    throw 'The exception wasn\'t throw'
  }
})

it('throw an execption when the separator contain invalid characteres', async () => {

  let thrownTheExecption = false;

  try {
    await runWebpack('style.js', { separator: '?.>' });
  } catch (err) { 
    thrownTheExecption = true;
  }

  if (!thrownTheExecption) {
    throw 'The exception wasn\'t throw'
  }
})


it('import the result of the previous loader as esModule', async () => {
  const { style } = await runWebpack('style.js', undefined, { esModule: true });
  expect(style).toEqual(expect.objectContaining({
    app: expect.any(String),
    card: {
      title: expect.any(String),
      description: expect.any(String)
    }
  }));
});

it('import the result of the previous loader as CommonJS module', async () => {
  const { style } = await runWebpack('style.js', undefined, { esModule: false });
  expect(style).toEqual(expect.objectContaining({
    app: expect.any(String),
    card: {
      title: expect.any(String),
      description: expect.any(String)
    }
  }));
});
