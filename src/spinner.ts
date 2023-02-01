import ora from 'ora';

export class Spinner {
  spinner = ora();

  /**
   * Update the text of the spinner
   * @param message - The message to display
   */
  updateText(message: string) {
    if (this.spinner.isSpinning) {
      this.spinner.text = message;
      return;
    }
    this.spinner.start(message);
  }

  /**
   * Stop the spinner
   */
  stop() {
    if (this.spinner.isSpinning) {
      this.spinner.stop();
    }
  }

  /**
   * Fail the spinner with an optional message
   * @param message - The message to display
   */
  error(message?: string) {
    if (this.spinner.isSpinning) {
      this.spinner.fail(message);
    }
  }

  /**
   * Succeed the spinner with an optional message
   * @param message - The message to display
   */
  success(message?: string) {
    if (this.spinner.isSpinning) {
      this.spinner.succeed(message);
    }
  }

  /**
   * Display a warning message
   * @param message - The message to display
   */
  info(message: string) {
    this.spinner.info(message);
  }
}

export const spinner = new Spinner();
