import React from 'react';

import { EyeIcon } from '@heroicons/react/24/outline';
import { EyeSlashIcon } from '@heroicons/react/24/outline';

type Props = {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  bottomLeftLabel?: string;
};

const InputField: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  ({ type, placeholder, bottomLeftLabel, ...rest }, ref) => {
    const [showPass, setShowPass] = React.useState(false);
    const isPasswordField = type === 'password';

    return (
      <div className="form-control relative my-2">
        <input
          ref={ref}
          type={!isPasswordField ? type : showPass ? 'text' : type}
          placeholder={placeholder}
          className="input input-bordered w-full"
          {...rest}
        />
        {bottomLeftLabel && (
          <label className="label">
            <span className="label-text-alt">{bottomLeftLabel}</span>
          </label>
        )}

        {isPasswordField ? (
          <>
            {showPass ? (
              <EyeSlashIcon
                className="h-6 top-3 right-2 absolute cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <EyeIcon
                className="h-6 top-3 right-2 absolute cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </>
        ) : null}
      </div>
    );
  },
);

export default InputField;
